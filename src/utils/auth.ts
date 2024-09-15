import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export const getUsername = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return null
  }
  const author = token.nickname
  return author
}
