import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/app/_db/mongo'
import Post from '@/app/_db/models/Post'
import { getUsernameByToken } from '@/utils/auth'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'


export async function GET(req: NextRequest, { params }: Params) {
  await dbConnect()
  const { postId } = params
  const result = await Post.findOne({ _id: postId })
  // .populate('comments', 'author content', Comment)
  if (!result) {
    return NextResponse.json({}, { status: 400 })
  }
  return NextResponse.json({ data: result })
}

export async function PATCH(req: NextRequest, { params }: Params) {
  await dbConnect()
  const { postId } = params
  const body = await req.json()
  const { title, content } = body
  const author = await getUsernameByToken(req)
  if (!author) {
    return NextResponse.json({}, { status: 401 })
  }
  const result = await Post.findOneAndUpdate({ _id: postId, author }, { $set: { title, content } })
  if (!result) {
    return NextResponse.json({}, { status: 401 })
  }
  return NextResponse.json({})
}

