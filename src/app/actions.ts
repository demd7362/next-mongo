'use server'
import dbConnect from '@/app/_db/mongo'
import Comment from '@/app/_db/models/Comment'
import { NextResponse } from 'next/server'
import Post from '@/app/_db/models/Post'
import { notFound } from 'next/navigation'
import { getUsernameByToken, getUsernameBySession } from '@/utils/auth'
import { getServerSession } from 'next-auth'

const PER_PAGE = 10

export const getCommentsByPagination = async (postId: string, page: number) => {
  await dbConnect()
  const options = { page, limit: PER_PAGE }
  // @ts-ignore overwrite 되지않게 메모리에 올라가있는거 쓰면 ts 에러나서 ignore 처리
  const comments = await Comment.paginate({ postId }, options)
  return comments
}
export const getPostById = async (postId: string) => {
  await dbConnect()
  try {
    const post = await Post.findOne({ _id: postId })
    // .populate('comments', 'author content', Comment)
    return post
  } catch (e) {
    notFound()
  }
}
export const getPostsByPagination = async (page: number) => {
  await dbConnect()
  const options = { page, limit: PER_PAGE }
  // @ts-ignore overwrite 되지않게 메모리에 올라가있는거 쓰면 ts 에러나서 ignore 처리
  const posts = await Post.paginate({}, options)
  return posts
}

export const createComment = async (postId: string, content: string) => {
  await dbConnect()
  const author = await getUsernameBySession()
  if(!author){
    return false
  }
  await Comment.create({
    content,
    postId,
    author
  })
  return true
}

export const modifyComment = async (commentId: string, content: string) => {
  await dbConnect()
  const username = await getUsernameBySession()
  if (!username) {
    return false
  }
  const result = await Comment.findOneAndUpdate({ _id: commentId, author: username }, {
    $set: {
      content
    }
  })
  return !!result
}

export const deleteComment = async (commentId: string) => {
  await dbConnect()
  const username = await getUsernameBySession()
  if (!username) {
    return false
  }
  const result = await Comment.findOneAndDelete(
    { _id: commentId, author: username }
  )
  return !!result
}
