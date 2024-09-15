import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/app/_db/mongo'
import { getUsername } from '@/utils/auth'
import Comment from '@/app/_db/models/Comment'

interface PathVariableProps {
  params: { postId: string }
}

export async function GET(req: NextRequest, { params }: PathVariableProps) {
  await dbConnect()
  const { postId } = params
  const comments = await Comment.find({ postId })
  return NextResponse.json({ data: comments })
}

export async function POST(req: NextRequest, { params }: PathVariableProps) {
  await dbConnect()
  const author = await getUsername(req)
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
