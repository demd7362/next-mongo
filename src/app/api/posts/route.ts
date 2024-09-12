import dbConnect from '@/app/_db/mongo'
import { NextRequest, NextResponse } from 'next/server'
import Post from '@/app/_db/models/Post'

export async function GET(req: NextRequest){
  await dbConnect()
  const url = req.nextUrl
  const page = Number(url.searchParams.get('page') ?? '1')
  const limit = Number(url.searchParams.get('limit') ?? '20')
  const options = {page ,limit}
  // @ts-ignore
  const result = await Post.paginate({}, options)
  return NextResponse.json({status: 200, data: result})
}
