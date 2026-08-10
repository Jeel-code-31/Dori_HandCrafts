import { NextResponse } from 'next/server';
import { execute } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { productId, userName, rating, comment, userId } = await req.json();

    if (!productId || !userName || !rating || !comment) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const reviewId = crypto.randomUUID();
    const numRating = parseInt(rating, 10);
    const createdAt = new Date();

    await execute(
      `INSERT INTO reviews (id, productId, userId, userName, rating, comment, verifiedPurchase, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
      [reviewId, productId, userId || null, userName, numRating, comment, createdAt]
    );

    return NextResponse.json(
      {
        id: reviewId,
        productId,
        userId: userId || null,
        userName,
        rating: numRating,
        comment,
        verifiedPurchase: true,
        createdAt,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create review error:', error);
    return NextResponse.json({ message: 'Failed to create review' }, { status: 500 });
  }
}
