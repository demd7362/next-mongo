import React from 'react'
import $axios from '@/utils/axios'
import { formatDate } from '@/utils/date'
import ToastUiViewer from '@/components/ToastUiViewer'
import PostButtonWrapper from '@/components/PostButtonWrapper'
import { notFound } from 'next/navigation'

interface Props {
  params: { [key: string]: string | undefined }
}



export default async function Page({ params }: Props) {
  const { objectId } = params
  let post;
  try {
    const response = await $axios.get(`/api/posts/${objectId}`)
    post = response.data.data
  } catch (e){
    notFound()
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="mb-4 text-gray-600">
        <span>작성자: {post.author}</span> <span className="ml-4">작성일: {formatDate(post.createdAt)}</span>
      </div>
      <ToastUiViewer content={post.content}/>
      <PostButtonWrapper />
    </div>
  )
}

