'use client'
import { Pencil, Trash2 } from 'lucide-react'
import $axios, { catcher } from '@/utils/axios'
import { useRouter } from 'next/navigation'

interface CommentButtonProps {
  commentId: string
}

export default function CommentButtonWrapper({ commentId }: CommentButtonProps) {
  const router = useRouter()
  const handleEdit = async (commentId: string) => {
    try {
      await $axios.patch(`/api/comments/${commentId}`)
      router.refresh()
    } catch (e: any) {
      catcher(e)
    }
  }
  const handleDelete = async (commentId: string) => {
    try {
      await $axios.delete(`/api/comments/${commentId}`)
      router.refresh()
    } catch (e: any) {
      catcher(e)
    }
  }
  return (
    <div className="flex space-x-2">
      <button onClick={() => handleEdit(commentId)} className="text-blue-500 hover:text-blue-700">
        <Pencil size={18} />
      </button>
      <button onClick={() => handleDelete(commentId)} className="text-red-500 hover:text-red-700">
        <Trash2 size={18} />
      </button>
    </div>
  )
}
