import { NextResponse } from 'next/server';
import { verifyFixedCredentials } from '@/lib/login';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dori_handcrafts_super_secret_jwt_key_2026';

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();
    const usernameOrEmail = email || username;

    if (!usernameOrEmail || !password) {
      return NextResponse.json(
        { message: 'Username/Email and password are required' },
        { status: 400 }
      );
    }

    // Verify strictly against fixed credentials defined in src/lib/login.ts
    const validation = verifyFixedCredentials(usernameOrEmail, password);

    if (!validation.success || !validation.user) {
      return NextResponse.json(
        { message: validation.message || 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = validation.user;

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
        userCountIndex: user.userCountIndex,
      },
    });
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
