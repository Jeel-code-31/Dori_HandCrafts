import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json();

    // Generate mock/sandbox Razorpay Order ID for architecture demo
    const razorpayOrderId = `order_${Math.random().toString(36).substring(2, 15)}`;

    return NextResponse.json({
      id: razorpayOrderId,
      entity: 'order',
      amount: Math.round(amount * 100), // amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      status: 'created',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_DoriHandcraftsKey123',
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to initiate Razorpay order' }, { status: 500 });
  }
}
