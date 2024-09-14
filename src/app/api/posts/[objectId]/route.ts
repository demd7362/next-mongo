import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/app/_db/mongo'
import Post from '@/app/_db/models/Post'
import { getToken } from 'next-auth/jwt'

interface PostPathVariableProps {
  params: { objectId: string }
}

export async function GET(req: NextRequest, { params }: PostPathVariableProps) {
  await dbConnect()
  const { objectId } = params
  const result = await Post.findOne({ _id: objectId })
  if (!result) {
    return NextResponse.json({}, { status: 400 })
  }
  return NextResponse.json({ data: result })
}

export async function PATCH(req: NextRequest, { params }: PostPathVariableProps) {
  await dbConnect()
  const { objectId } = params
  const body = await req.json()
  const { title, content } = body
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return NextResponse.json({}, { status: 401 })
  }
  const author = token.nickname
  const result = await Post.findOneAndUpdate({ _id: objectId, author }, { $set: { title, content } })
  if (!result) {
    return NextResponse.json({}, { status: 400 })
  }
  return NextResponse.json({}, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: PostPathVariableProps) {
  await dbConnect()
  const { objectId } = params
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return NextResponse.json({}, { status: 401 })
  }
  const author = token.nickname
  const result = await Post.findOneAndDelete({ _id: objectId, author })
  if (!result) {
    return NextResponse.json({}, { status: 400 })
  }
  return NextResponse.json({}, { status: 200 })
}
