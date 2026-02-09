// export { auth as middleware } from '@/auth';

import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export default auth(function middleware(req) {
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login');

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return null;
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return null;
});

export const config = {
  matcher: ['/', '/login'],
};
