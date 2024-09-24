// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const notAllowed = new Set(['/posts/write'])

export async function middleware(req: NextRequest) {
  const path = new URL(req.url).pathname
  if(notAllowed.has(path)){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.redirect(new URL(`/login?redirect_url=${path}`, req.url));
    }
  }

  // 인증된 경우 요청 진행
  return NextResponse.next();
}

// 미들웨어 적용할 경로 설정 (예: 모든 경로에 적용)
export const config = {
  matcher: ['/:path*'],
};
