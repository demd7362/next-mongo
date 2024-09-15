import React, { Suspense } from 'react'
import $axios from '@/utils/axios'
import { formatDate, formatDateTime } from '@/utils/date'
import ToastUiViewer from '@/components/ToastUiViewer'
import PostButtonWrapper from '@/components/PostButtonWrapper'
import { notFound } from 'next/navigation'
import CommentInput from '@/app/posts/_components/CommentInput'
import CommentList from '@/app/posts/_components/CommentList'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'



export default async function Page({ params }: Params) {
  const { postId } = params
  let post;
  try {
    const response = await $axios.get(`/api/posts/${postId}`)
    post = response.data.data
  } catch (e){
    notFound()
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="mb-4 text-gray-600">
        <span>작성자: {post.author}</span> <span className="ml-4">작성일: {formatDateTime(post.createdAt)}</span>
      </div>
      <ToastUiViewer content={post.content}/>
      <PostButtonWrapper />
      <Suspense fallback={<div>loading...</div>}>
        <CommentList postId={postId} />
      </Suspense>
      <CommentInput postId={postId} />
    </div>
  )
}

