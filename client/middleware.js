import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' 

  const token =  request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard'
  ]
}