import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export const getUsername = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return NextResponse.json({}, { status: 401 })
  }
  const author = token.nickname
  return author
}
