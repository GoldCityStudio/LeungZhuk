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

    const user = getUserByEmail(email);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { isAdmin: false, error: '您沒有管理員權限' },
        { status: 403 }
      );
    }

    return NextResponse.json({ 
      isAdmin: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: '檢查失敗' },
      { status: 500 }
    );
  }
}




