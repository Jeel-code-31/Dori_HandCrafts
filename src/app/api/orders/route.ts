import { NextResponse } from 'next/server';
import { query, queryOne, execute } from '@/lib/db';
import crypto from 'crypto';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    let sql = 'SELECT * FROM orders WHERE 1=1';
    const params: any[] = [];

    if (userId) {
      sql += ' AND userId = ?';
      params.push(userId);
    }
    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    sql += ' ORDER BY createdAt DESC';

    const orderRows = await query(sql, params);

    const orders = await Promise.all(
      orderRows.map(async (order: any) => {
        const itemRows = await query(
          'SELECT * FROM order_items WHERE orderId = ?',
          [order.id]
        );

        const items = await Promise.all(
          itemRows.map(async (item: any) => {
            const product = await queryOne(
              'SELECT * FROM products WHERE id = ?',
              [item.productId]
            );

            let images: any[] = [];
            if (product) {
              images = await query(
                'SELECT * FROM product_images WHERE productId = ? ORDER BY `order` ASC',
                [product.id]
              );
            }

            return {
              id: item.id,
              orderId: item.orderId,
              productId: item.productId,
              variantId: item.variantId,
              name: item.name,
              price: parseFloat(item.price),
              quantity: item.quantity,
              image: item.image,
              product: product
                ? {
                    ...product,
                    price: parseFloat(product.price),
                    images: images.map((img: any) => ({
                      ...img,
                      isPrimary: Boolean(img.isPrimary),
                      isSecondary: Boolean(img.isSecondary),
                    })),
                  }
                : null,
            };
          })
        );

        return {
          id: order.id,
          orderNumber: order.orderNumber,
          userId: order.userId,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          phone: order.phone,
          shippingAddress: order.shippingAddress,
          subtotal: parseFloat(order.subtotal),
          discount: parseFloat(order.discount || 0),
          shippingFee: parseFloat(order.shippingFee || 0),
          total: parseFloat(order.total),
          status: order.status,
          paymentStatus: order.paymentStatus,
          paymentId: order.paymentId,
          paymentMethod: order.paymentMethod,
          trackingNumber: order.trackingNumber,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          items,
        };
      })
    );

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('Get orders error:', error);
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      customerName,
      customerEmail,
      phone,
      shippingAddress,
      items,
      subtotal,
      discount,
      shippingFee,
      total,
      paymentMethod,
      paymentId,
    } = body;

    const orderId = crypto.randomUUID();
    const orderNumber = 'DORI-' + Math.floor(100000 + Math.random() * 900000);
    const addressStr = typeof shippingAddress === 'string' ? shippingAddress : JSON.stringify(shippingAddress);
    const statusVal = paymentId ? 'Paid' : 'Pending';

    await execute(
      `INSERT INTO orders (
        id, orderNumber, userId, customerName, customerEmail, phone,
        shippingAddress, subtotal, discount, shippingFee, total,
        paymentMethod, paymentId, paymentStatus, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        orderNumber,
        userId || null,
        customerName,
        customerEmail,
        phone,
        addressStr,
        parseFloat(subtotal),
        parseFloat(discount || 0),
        parseFloat(shippingFee || 0),
        parseFloat(total),
        paymentMethod || 'Razorpay',
        paymentId || null,
        statusVal,
        statusVal,
      ]
    );

    const insertedItems: any[] = [];
    if (Array.isArray(items)) {
      for (const item of items) {
        const itemId = crypto.randomUUID();
        await execute(
          `INSERT INTO order_items (id, orderId, productId, variantId, name, price, quantity, image)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            itemId,
            orderId,
            item.productId,
            item.variantId || null,
            item.name,
            parseFloat(item.price),
            parseInt(item.quantity, 10),
            item.image || null,
          ]
        );

        insertedItems.push({
          id: itemId,
          orderId,
          productId: item.productId,
          variantId: item.variantId || null,
          name: item.name,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity, 10),
          image: item.image || null,
        });

        // Decrement stock
        await execute(
          'UPDATE products SET stock = GREATEST(0, stock - ?) WHERE id = ?',
          [parseInt(item.quantity, 10), item.productId]
        ).catch((e) => console.error('Error decrementing stock:', e));
      }
    }

    const order = {
      id: orderId,
      orderNumber,
      userId: userId || null,
      customerName,
      customerEmail,
      phone,
      shippingAddress: addressStr,
      subtotal: parseFloat(subtotal),
      discount: parseFloat(discount || 0),
      shippingFee: parseFloat(shippingFee || 0),
      total: parseFloat(total),
      paymentMethod: paymentMethod || 'Razorpay',
      paymentId: paymentId || null,
      paymentStatus: statusVal,
      status: statusVal,
      items: insertedItems,
    };

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ message: error.message || 'Failed to create order' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, status, paymentStatus } = await req.json();

    if (!orderId) {
      return NextResponse.json({ message: 'Order ID is required' }, { status: 400 });
    }

    if (status && paymentStatus) {
      await execute('UPDATE orders SET status = ?, paymentStatus = ? WHERE id = ?', [status, paymentStatus, orderId]);
    } else if (status) {
      await execute('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
    } else if (paymentStatus) {
      await execute('UPDATE orders SET paymentStatus = ? WHERE id = ?', [paymentStatus, orderId]);
    }

    const updated = await queryOne('SELECT * FROM orders WHERE id = ?', [orderId]);

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Patch order error:', error);
    return NextResponse.json({ message: 'Failed to update order status' }, { status: 500 });
  }
}
