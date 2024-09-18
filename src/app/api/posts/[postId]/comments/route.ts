import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/app/_db/mongo'
import { getUsername } from '@/utils/auth'
import Comment from '@/app/_db/models/Comment'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Post from '@/app/_db/models/Post'


export async function GET(req: NextRequest, { params }: Params) {
  await dbConnect()
  const url = req.nextUrl
  const page = Number(url.searchParams.get('page') || '1')
  const limit = Number(url.searchParams.get('per_page') || '10')
  const options = { page, limit }
  const { postId } = params
  // @ts-ignore overwrite 되지않게 메모리에 올라가있는거 쓰면 ts 에러나서 ignore 처리
  const comments = await Comment.paginate({postId}, options)

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
