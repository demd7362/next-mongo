import { NextRequest, NextResponse } from 'next/server'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import dbConnect from '@/app/_db/mongo'
import Comment from '@/app/_db/models/Comment'
import { getUsernameByToken } from '@/utils/auth'

export async function PATCH(req: NextRequest, { params }: Params) {
  await dbConnect()
  const username = await getUsernameByToken(req)
  if (!username) {
    return NextResponse.json({}, { status: 401 })
  }
  const body = await req.json()
  const { commentId } = params
  await Comment.findOneAndUpdate({ _id: commentId }, {
    $set: {
      content: body.content
    }
  })
  return NextResponse.json({})
}

export async function DELETE(req: NextRequest, { params }: Params) {
  await dbConnect()
  const username = await getUsernameByToken(req)
  if (!username) {
    return NextResponse.json({}, { status: 401 })
  }
  const { commentId } = params
  const findResult = await Comment.findOneAndDelete(
    { _id: commentId, author: username }
  )
  if (!findResult) {
    return NextResponse.json({}, { status: 403 })
  }
  return NextResponse.json({}) // return 안하면 500
}
