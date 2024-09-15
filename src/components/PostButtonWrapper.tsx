'use client'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import $axios, { catcher } from '@/utils/axios'


export default function PostButtonWrapper() {
  const router = useRouter()
  const { postId } = useParams()
  const handleDelete = async () => {
    try {
      await $axios.delete(`/api/posts/${postId}`)
      router.replace('/posts')
      router.refresh()
    } catch (e) {
      catcher(e)
    }
  }
  return (
    <div className="flex justify-end gap-4 mt-8">
      <button onClick={() => router.push(`/posts/write?id=${postId}`)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl">
        수정
      </button>
      <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl">
        삭제
      </button>
      <button onClick={() => router.push('/posts')} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors shadow-lg hover:shadow-xl">
        목록
      </button>
    </div>
  )
}
