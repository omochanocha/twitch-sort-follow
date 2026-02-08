// export { auth as middleware } from '@/auth';

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { auth } from '@/auth';

export default auth(async function middleware(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-member-access
  console.log('has req.auth?', !!(req as any).auth);
  console.log('pathname', req.nextUrl.pathname);

  const token = await getToken({ req, secret: process.env['NEXTAUTH_SECRET']! });
  console.log('getToken()', token ? 'HAS_TOKEN' : 'NO_TOKEN');
  const isAuth = !!token;
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
