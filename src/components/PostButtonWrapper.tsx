'use client'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { changeLikes, deletePost } from '@/app/actions'
import { useAlertModal } from '@/store/modalStore'
import { ThumbsUp, ThumbsDown, Edit, Trash2, List } from 'lucide-react'

export default function PostButtonWrapper() {
  const router = useRouter()
  const {openModal} = useAlertModal()
  const { postId } = useParams()

  const handleLikeCount = async (isLike: boolean) => {
    const isChanged = await changeLikes(postId as string, isLike)
    if(isChanged){
      router.refresh()
    } else {
      openModal('실패했습니다.')
    }
  }

  const handleDelete = async () => {
    const isDeleted = await deletePost(postId as string)
    if(isDeleted){
      router.push('/posts')
    } else {
      openModal('삭제에 실패했습니다.')
    }
  }

  return (
    <div className="flex justify-end gap-4 mt-8 mb-3">
      <button onClick={() => handleLikeCount(true)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl">
        <ThumbsUp size={24} />
      </button>
      <button onClick={() => handleLikeCount(false)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl">
        <ThumbsDown size={24} />
      </button>
      <button onClick={() => router.push(`/posts/write?id=${postId}`)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl">
        <Edit size={24} />
      </button>
      <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl">
        <Trash2 size={24} />
      </button>
      <button onClick={() => router.push('/posts')} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors shadow-lg hover:shadow-xl">
        <List size={24} />
      </button>
    </div>
  )
}
