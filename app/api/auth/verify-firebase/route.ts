import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token, email } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // For demo purposes, we'll verify the token exists and check user role from local DB
    // In production, use Firebase Admin SDK to properly verify the token
    try {
      // Check if user is admin (from local DB)
      const { getUserByEmail } = await import('@/lib/db');
      
      // If email is provided, use it; otherwise we can't verify
      if (!email) {
        return NextResponse.json(
          { error: 'Email required' },
          { status: 400 }
        );
      }

      const user = getUserByEmail(email);
      
      if (!user || user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Access denied' },
          { status: 403 }
        );
      }

      // Token exists and user is admin
      return NextResponse.json({ 
        valid: true, 
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        }
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}

