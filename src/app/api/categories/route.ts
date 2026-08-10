import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const rows = await query(`
      SELECT c.*, COUNT(p.id) AS productCount
      FROM categories c
      LEFT JOIN products p ON c.id = p.categoryId
      GROUP BY c.id
      ORDER BY c.name ASC
    `);

    const categories = rows.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      createdAt: cat.createdAt,
      _count: {
        products: Number(cat.productCount || 0),
      },
    }));

    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('Get categories error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
