import dbConnect from '@/app/_db/mongo'
import { NextRequest, NextResponse } from 'next/server'
import Post from '@/app/_db/models/Post'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  await dbConnect()
  const url = req.nextUrl
  const page = Number(url.searchParams.get('page') || '1')
  const limit = Number(url.searchParams.get('per_page') || '10')
  const options = { page, limit }
  // @ts-ignore overwrite 되지않게 메모리에 올라가있는거 쓰면 ts 에러나서 ignore 처리
  const result = await Post.paginate({}, options)
  return NextResponse.json({ data: result })
}

