import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/app/_db/mongo'
import Post from '@/app/_db/models/Post'
import Comment from '@/app/_db/models/Comment'
import { getToken } from 'next-auth/jwt'
import { getUsername } from '@/utils/auth'

interface PathVariableProps {
  params: { postId: string }
}


export async function GET(req: NextRequest, { params }: PathVariableProps) {
  await dbConnect()
  const { postId } = params
  const result = await Post.findOne({ _id: postId })
    // .populate('comments')
  if (!result) {
    return NextResponse.json({}, { status: 400 })
  }
  return NextResponse.json({ data: result })
}

export async function PATCH(req: NextRequest, { params }: PathVariableProps) {
  await dbConnect()
  const { postId } = params
  const body = await req.json()
  const { title, content } = body
  const author = await getUsername(req)
  const result = await Post.findOneAndUpdate({ _id: postId, author }, { $set: { title, content } })
  if (!result) {
    return NextResponse.json({}, { status: 400 })
  }
  return NextResponse.json({})
}

export async function DELETE(req: NextRequest, { params }: PathVariableProps) {
  await dbConnect()
  const { postId } = params
  const author = await getUsername(req)
  const result = await Post.findOneAndDelete({ _id: postId, author })
  if (!result) {
    return NextResponse.json({}, { status: 400 })
  }
  return NextResponse.json({})
}
