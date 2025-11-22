import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Only run on /admin routes
    if (!request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.next()
    }

    const token = request.cookies.get('admin-token')?.value
    const isLoginPage = request.nextUrl.pathname === '/admin/login'

    // If user has token and is on login page, redirect to dashboard
    if (token && isLoginPage) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    // If user has NO token and is NOT on login page, redirect to login
    if (!token && !isLoginPage) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
