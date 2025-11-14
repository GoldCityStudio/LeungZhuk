import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, createUser } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email, role } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = getUserByEmail(email);
    
    // Create user if doesn't exist
    if (!user) {
      // Special handling for admin accounts
      let defaultRole = role || 'user';
      if (email === 'admin@meatshop.com' || email === 'manager@meatshop.com') {
        defaultRole = 'admin';
      }
      
      user = createUser({
        email: email,
        password: '', // No password needed with Firebase
        role: defaultRole,
      });
    }

    return NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: '操作失敗' },
      { status: 500 }
    );
  }
}

