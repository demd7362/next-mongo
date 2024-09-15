import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/app/_db/mongo'
import { getUsername } from '@/utils/auth'
import Comment from '@/app/_db/models/Comment'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'


export async function GET(req: NextRequest, { params }: Params) {
  await dbConnect()
  const { postId } = params
  const comments = await Comment.find({ postId })
  return NextResponse.json({ data: comments })
}

export async function POST(req: NextRequest, { params }: Params) {
  await dbConnect()
  const author = await getUsername(req)
  if(!author){
    return NextResponse.json({}, { status: 401 })
  }
  const body = await req.json()
  const { content } = body
  const { postId } = params
  await Comment.create({
    content,
    postId,
    author
  })
  return NextResponse.json({})
}
