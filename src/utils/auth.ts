import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/app/_db/mongo'

export const getUsernameByToken = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return null
  }
  const author = token.name
  return author
}

export const getUsernameBySession = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return null
  }
  const username = session.user.token.name
  return username
}

export const getUserIdBySession = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return null
  }
  const id = session.user.token.objectId
  return id
}
