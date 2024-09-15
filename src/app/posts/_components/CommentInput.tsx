'use client'
import { FormEvent, useState, useTransition } from 'react'
import $axios from '@/utils/axios'
import { useRouter } from 'next/navigation'


export default function CommentInput({ postId }: { postId: string }) {
  const [newComment, setNewComment] = useState('')
  const router = useRouter()
  const handleSubmit = async () => {
    await $axios.post(`/api/posts/${postId}/comments`, { content: newComment })
    setNewComment('')
    router.refresh()
  }


  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">댓글</h2>
      <div className="mb-4">
        <textarea className="w-full p-2 border rounded" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="댓글을 입력하세요..." />
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSubmit}>
          댓글 작성
        </button>
      </div>
    </div>
  )
};
