'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createComment } from '@/app/actions'

interface CommentInputProps {
  postId: string
}

export default function CommentInput({ postId }: CommentInputProps) {
  const [newComment, setNewComment] = useState('')
  const [showMentions, setShowMentions] = useState(false)
  const [mentionUsers, setMentionUsers] = useState<string[]>(['정지훈','박상혁'])
  const [cursorPosition, setCursorPosition] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const handleSubmit = async () => {
    const isCreated = await createComment(postId, newComment)
    if(isCreated) {
      setNewComment('')
      router.refresh()
    } else {
      router.push('/login')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setNewComment(value)
    setCursorPosition(e.target.selectionStart)

    const lastChar = value.charAt(e.target.selectionStart - 1)
    setShowMentions(lastChar === '@')
    console.log('Last char:', lastChar, 'Show mentions:', lastChar === '@') // Debugging line
  }

  const handleMentionSelect = (user: string) => {
    const beforeMention = newComment.slice(0, cursorPosition)
    const afterMention = newComment.slice(cursorPosition)
    setNewComment(`${beforeMention}${user} ${afterMention}`)
    setShowMentions(false)
    textareaRef.current?.focus()
  }

  useEffect(() => {
    console.log('showMentions:', showMentions) // Debugging line
    console.log('mentionUsers:', mentionUsers) // Debugging line
  }, [showMentions, mentionUsers])

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="relative">
          <textarea
            ref={textareaRef}
            className="w-full p-4 border-b border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 transition duration-200"
            value={newComment}
            onChange={handleChange}
            placeholder="댓글을 입력하세요..."
            rows={4}
          />
          {showMentions && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg">
              {mentionUsers.map((user, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleMentionSelect(user)}
                >
                  @{user}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right">
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            onClick={handleSubmit}
          >
            작성
          </button>
        </div>
      </div>
    </div>
  )
}
