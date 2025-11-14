import { NextResponse } from 'next/server';
import { initializeFakeData } from '@/lib/initFakeData';

export async function GET() {
  try {
    await initializeFakeData();
    return NextResponse.json({ 
      message: '假資料初始化成功',
      note: '已建立假用戶、產品和訂單資料'
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '初始化假資料失敗' },
      { status: 500 }
    );
  }
}

