import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebase-token')?.value || request.cookies.get('admin-token')?.value;
  const pathname = request.nextUrl.pathname;

  // Allow access to login page without authentication
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // For now, we'll allow access if token exists
    // In production, you should verify the token with Firebase Admin SDK
    // The actual verification happens in the page component
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

