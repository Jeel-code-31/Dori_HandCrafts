import { NextResponse } from 'next/server';
import { query, queryOne, execute } from '@/lib/db';
import { ALL_FALLBACK_PRODUCTS } from '@/lib/fallbackProducts';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    let product = await queryOne(
      'SELECT * FROM products WHERE slug = ? OR id = ?',
      [slug, slug]
    );

    if (!product) {
      // Check fallback products (malachite & hand-painted)
      const fallbackItem = ALL_FALLBACK_PRODUCTS.find(
        (p: any) => p.slug === slug || p.id === slug
      );

      if (fallbackItem) {
        return NextResponse.json({
          description: 'Handcrafted luxury piece meticulously fashioned by master artisans using premium materials.',
          shortDescription: 'Exquisite handcrafted living collection item.',
          stock: 10,
          material: 'Genuine Malachite & Solid Brass',
          dimensions: 'Standard Craft Size',
          color: 'Deep Green & Gold Accent',
          careInstructions: 'Spot clean gently with a soft dry cloth. Keep away from direct harsh chemicals.',
          shippingInformation: 'Handcrafted on order. Ships within 3-5 business days across India and internationally.',
          reviews: [
            { id: 'rev-1', userName: 'Ananya Sharma', rating: 5, comment: 'Absolutely breathtaking craft quality and rich color!' },
            { id: 'rev-2', userName: 'Vikram Mehta', rating: 5, comment: 'Priceless addition to our living room decor. Highly recommend.' }
          ],
          ...fallbackItem,
        });
      }

      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Fetch category
    const category = await queryOne(
      'SELECT * FROM categories WHERE id = ?',
      [product.categoryId]
    );

    // Fetch images
    const images = await query(
      'SELECT * FROM product_images WHERE productId = ? ORDER BY `order` ASC',
      [product.id]
    );

    // Fetch variants
    const variants = await query(
      'SELECT * FROM product_variants WHERE productId = ?',
      [product.id]
    );

    // Fetch reviews
    const reviews = await query(
      'SELECT * FROM reviews WHERE productId = ? ORDER BY createdAt DESC',
      [product.id]
    );

    // Format boolean fields and numbers cleanly
    const formattedProduct = {
      ...product,
      price: parseFloat(product.price),
      compareAtPrice: product.compareAtPrice ? parseFloat(product.compareAtPrice) : null,
      featured: Boolean(product.featured),
      newArrival: Boolean(product.newArrival),
      bestSeller: Boolean(product.bestSeller),
      sale: Boolean(product.sale),
      category,
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

    return NextResponse.json(formattedProduct);
  } catch (error: any) {
    console.error('Get product by slug error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    await execute('DELETE FROM products WHERE id = ?', [slug]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json({ message: 'Failed to delete product' }, { status: 500 });
  }
}
