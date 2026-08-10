import { NextResponse } from 'next/server';
import { query, queryOne, execute } from '@/lib/db';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const product = await queryOne(
      'SELECT * FROM products WHERE slug = ? OR id = ?',
      [slug, slug]
    );

    if (!product) {
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
