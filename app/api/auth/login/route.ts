import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, getUsers } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Initialize admin user if it doesn't exist
    const { createUser } = await import('@/lib/db');
    const adminUser = getUserByEmail('admin@meatshop.com');
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      createUser({
        email: 'admin@meatshop.com',
        password: hashedPassword,
        role: 'admin',
      });
    }

    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: '無效的登入資料' },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: '無效的登入資料' },
        { status: 401 }
      );
    }

    // Allow both admin and regular users to login
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.NEXTAUTH_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    return NextResponse.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error: any) {
      return NextResponse.json(
        { error: error.message || '登入失敗' },
        { status: 500 }
      );
  }
}

