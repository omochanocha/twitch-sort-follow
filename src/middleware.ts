// export { auth as middleware } from '@/auth';

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { auth } from '@/auth';

export default auth(async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env['NEXTAUTH_SECRET']! });
  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login');

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return null;
    // return NextResponse.redirect(new URL('/login', req.url));
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
});

export const config = {
  matcher: ['/', '/login'],
};
