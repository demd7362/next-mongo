'use client'
import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useInputModal } from '@/store/modalStore'
import { deleteComment, modifyComment } from '@/app/actions'

interface CommentButtonProps {
  commentId: string
}

export default function CommentButtonWrapper({ commentId }: CommentButtonProps) {
  const router = useRouter()
  const { openModal, setCallback, content } = useInputModal()
  const handleModifyComment = async (content: string) => {
    const isModified = await modifyComment(commentId, content)
    if (isModified) {
      router.refresh()
    } else {
      alert('잘못된 요청입니다.')
    }
  }

  const handleDelete = async (commentId: string) => {
    const isDeleted = await deleteComment(commentId)
    if (isDeleted) {
      router.refresh()
    } else {
      alert('잘못된 요청입니다.')
    }
  }

  return (
    <div className="flex space-x-2">
      <button onClick={() => {
        openModal('댓글 수정')
        // 콜백을 설정할 때 최신 content를 참조할 수 있도록 수정
        setCallback(() => {
          const { content } = useInputModal.getState(); // 최신 상태 가져오기
          handleModifyComment(content);
        })
      }} className="text-blue-500 hover:text-blue-700">
        <Pencil size={18} />
      </button>
      <button onClick={() => handleDelete(commentId)} className="text-red-500 hover:text-red-700">
        <Trash2 size={18} />
      </button>
    </div>
  )
}
