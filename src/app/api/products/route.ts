import { NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import crypto from 'crypto';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    const newArrival = searchParams.get('newArrival') === 'true';
    const bestSeller = searchParams.get('bestSeller') === 'true';
    const sort = searchParams.get('sort');
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;

    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug, c.description as category_desc, c.image as category_image
      FROM products p
      LEFT JOIN categories c ON p.categoryId = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (category) {
      sql += ' AND c.slug = ?';
      params.push(category);
    }

    if (featured) {
      sql += ' AND p.featured = 1';
    }
    if (newArrival) {
      sql += ' AND p.newArrival = 1';
    }
    if (bestSeller) {
      sql += ' AND p.bestSeller = 1';
    }

    if (minPrice !== undefined) {
      sql += ' AND p.price >= ?';
      params.push(minPrice);
    }
    if (maxPrice !== undefined) {
      sql += ' AND p.price <= ?';
      params.push(maxPrice);
    }

    if (search) {
      sql += ' AND (p.name LIKE ? OR p.description LIKE ? OR p.tags LIKE ?)';
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    if (sort === 'price_asc') {
      sql += ' ORDER BY p.price ASC';
    } else if (sort === 'price_desc') {
      sql += ' ORDER BY p.price DESC';
    } else if (sort === 'best_selling') {
      sql += ' ORDER BY p.bestSeller DESC, p.createdAt DESC';
    } else {
      sql += ' ORDER BY p.createdAt DESC';
    }

    const rows = await query(sql, params);

    // Populate images, variants, and reviews for each product
    const products = await Promise.all(
      rows.map(async (prod: any) => {
        const images = await query(
          'SELECT * FROM product_images WHERE productId = ? ORDER BY `order` ASC',
          [prod.id]
        );
        const variants = await query(
          'SELECT * FROM product_variants WHERE productId = ?',
          [prod.id]
        );
        const reviews = await query(
          'SELECT * FROM reviews WHERE productId = ? ORDER BY createdAt DESC',
          [prod.id]
        );

        return {
          id: prod.id,
          slug: prod.slug,
          name: prod.name,
          description: prod.description,
          shortDescription: prod.shortDescription,
          price: parseFloat(prod.price),
          compareAtPrice: prod.compareAtPrice ? parseFloat(prod.compareAtPrice) : null,
          categoryId: prod.categoryId,
          SKU: prod.SKU,
          stock: prod.stock,
          material: prod.material,
          dimensions: prod.dimensions,
          color: prod.color,
          careInstructions: prod.careInstructions,
          shippingInformation: prod.shippingInformation,
          tags: prod.tags,
          featured: Boolean(prod.featured),
          newArrival: Boolean(prod.newArrival),
          bestSeller: Boolean(prod.bestSeller),
          sale: Boolean(prod.sale),
          createdAt: prod.createdAt,
          updatedAt: prod.updatedAt,
          category: prod.category_name
            ? {
                id: prod.categoryId,
                name: prod.category_name,
                slug: prod.category_slug,
                description: prod.category_desc,
                image: prod.category_image,
              }
            : null,
          images: images.map((img: any) => ({
            ...img,
            isPrimary: Boolean(img.isPrimary),
            isSecondary: Boolean(img.isSecondary),
          })),
          variants: variants.map((v: any) => ({
            ...v,
            price: v.price ? parseFloat(v.price) : null,
          })),
          reviews: reviews.map((r: any) => ({
            ...r,
            verifiedPurchase: Boolean(r.verifiedPurchase),
          })),
        };
      })
    );

    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Get products error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      compareAtPrice,
      categoryId,
      SKU,
      stock,
      material,
      dimensions,
      color,
      careInstructions,
      shippingInformation,
      tags,
      featured,
      newArrival,
      bestSeller,
      sale,
      images,
      variants,
    } = body;

    const productId = crypto.randomUUID();
    const productSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tagsString = Array.isArray(tags) ? JSON.stringify(tags) : tags || '[]';

    await execute(
      `INSERT INTO products (
        id, slug, name, description, shortDescription, price, compareAtPrice,
        categoryId, SKU, stock, material, dimensions, color, careInstructions,
        shippingInformation, tags, featured, newArrival, bestSeller, sale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        productId,
        productSlug,
        name,
        description,
        shortDescription,
        parseFloat(price),
        compareAtPrice ? parseFloat(compareAtPrice) : null,
        categoryId,
        SKU,
        parseInt(stock, 10) || 10,
        material || null,
        dimensions || null,
        color || null,
        careInstructions || null,
        shippingInformation || null,
        tagsString,
        featured ? 1 : 0,
        newArrival ? 1 : 0,
        bestSeller ? 1 : 0,
        sale ? 1 : 0,
      ]
    );

    const insertedImages: any[] = [];
    if (Array.isArray(images)) {
      for (let idx = 0; idx < images.length; idx++) {
        const imgUrl = typeof images[idx] === 'string' ? images[idx] : images[idx].url;
        const imgId = crypto.randomUUID();
        await execute(
          `INSERT INTO product_images (id, productId, url, isPrimary, isSecondary, type, \`order\`)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [imgId, productId, imgUrl, idx === 0 ? 1 : 0, idx === 1 ? 1 : 0, idx === 0 ? 'primary' : 'gallery', idx]
        );
        insertedImages.push({
          id: imgId,
          productId,
          url: imgUrl,
          isPrimary: idx === 0,
          isSecondary: idx === 1,
          order: idx,
        });
      }
    }

    const insertedVariants: any[] = [];
    if (Array.isArray(variants)) {
      for (const v of variants) {
        const vId = crypto.randomUUID();
        await execute(
          `INSERT INTO product_variants (id, productId, name, optionName, optionValue, sku, stock, price)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            vId,
            productId,
            v.name,
            v.optionName,
            v.optionValue,
            v.sku || null,
            v.stock ?? 5,
            v.price ? parseFloat(v.price) : null,
          ]
        );
        insertedVariants.push({
          id: vId,
          productId,
          name: v.name,
          optionName: v.optionName,
          optionValue: v.optionValue,
          sku: v.sku || null,
          stock: v.stock ?? 5,
          price: v.price ? parseFloat(v.price) : null,
        });
      }
    }

    const createdProduct = {
      id: productId,
      slug: productSlug,
      name,
      description,
      shortDescription,
      price: parseFloat(price),
      compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
      categoryId,
      SKU,
      stock: parseInt(stock, 10) || 10,
      material,
      dimensions,
      color,
      careInstructions,
      shippingInformation,
      tags: tagsString,
      featured: !!featured,
      newArrival: !!newArrival,
      bestSeller: !!bestSeller,
      sale: !!sale,
      images: insertedImages,
      variants: insertedVariants,
    };

    return NextResponse.json(createdProduct, { status: 201 });
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json({ message: error.message || 'Failed to create product' }, { status: 500 });
  }
}
