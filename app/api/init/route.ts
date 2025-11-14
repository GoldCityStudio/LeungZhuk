import { NextResponse } from 'next/server';
import { initializeSampleData } from '@/lib/initData';

export async function GET() {
  try {
    initializeSampleData();
    return NextResponse.json({ message: 'Data initialized successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to initialize data' },
      { status: 500 }
    );
  }
}

