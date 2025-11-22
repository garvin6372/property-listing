import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes are protected
const protectedRoutes = ['/admin', '/admin/dashboard', '/admin/properties', '/admin/inquiries', '/admin/valuations'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // Get the session token from cookies
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      // Redirect to login if no token
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
    
    // For our custom authentication, we'll just check if the token exists
    // In a real application, you would verify the token properly
    // The token should match what we set in the authentication context
    // Since we're using a simple approach, we'll accept any token value
  }
  
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ['/admin/:path*'],
};