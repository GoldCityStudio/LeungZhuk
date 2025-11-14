import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      );
    }

    // Check if this is an admin email
    const adminEmails = ['admin@meatshop.com', 'manager@meatshop.com'];
    if (!adminEmails.includes(email)) {
      return NextResponse.json(
        { error: 'Not an admin email' },
        { status: 400 }
      );
    }

    const user = getUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user role to admin if not already
    if (user.role !== 'admin') {
      const { updateUser } = await import('@/lib/db');
      const updatedUser = updateUser(user.id, { role: 'admin' });
      if (updatedUser) {
        return NextResponse.json({ 
          success: true,
          user: updatedUser
        });
      }
    }

    return NextResponse.json({ 
      success: true,
      user: user
    });
  } catch (error) {
    return NextResponse.json(
      { error: '操作失敗' },
      { status: 500 }
    );
  }
}

