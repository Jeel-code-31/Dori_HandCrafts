import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const subtotalStr = searchParams.get('subtotal');

    if (!code) {
      return NextResponse.json({ valid: false, message: 'Coupon code is required' }, { status: 400 });
    }

    const subtotal = subtotalStr ? parseFloat(subtotalStr) : 0;

    const coupon = await queryOne(
      'SELECT * FROM coupons WHERE UPPER(code) = ?',
      [code.toUpperCase()]
    );

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ valid: false, message: 'Invalid or inactive coupon code' });
    }

    const minOrderValue = coupon.minOrderValue ? parseFloat(coupon.minOrderValue) : 0;
    const discountValue = parseFloat(coupon.discountValue);

    if (minOrderValue && subtotal < minOrderValue) {
      return NextResponse.json({
        valid: false,
        message: `Minimum order value of ₹${minOrderValue} required for this coupon`,
      });
    }

    let discountAmount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discountAmount = (subtotal * discountValue) / 100;
    } else {
      discountAmount = discountValue;
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: discountValue,
      discountAmount: Math.min(discountAmount, subtotal),
    });
  } catch (error: any) {
    console.error('Validate coupon error:', error);
    return NextResponse.json({ valid: false, message: 'Server error' }, { status: 500 });
  }
}
