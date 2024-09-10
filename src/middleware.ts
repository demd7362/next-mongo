// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const allowed = new Set(['/login','/join','/'])

export async function middleware(request: NextRequest) {
  const path = new URL(request.url).pathname
  if(allowed.has(path)){
    return NextResponse.next();
  }
  // 인증 토큰 가져오기
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // 인증된 경우 요청 진행
  return NextResponse.next();
}

// 미들웨어 적용할 경로 설정 (예: 모든 경로에 적용)
export const config = {
  matcher: ['/:path*'],
};
