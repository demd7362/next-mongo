'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'
import $axios from '@/utils/axios'
import ToastUiEditor from '@/components/ToastUiEditor'
import { Editor } from '@toast-ui/react-editor'
import { createPost } from '@/app/actions'
import { useAlertModal } from '@/store/modalStore'

const EMPTY_CONTENT = '<p><br></p>'

export default function Page() {
  const searchParams = useSearchParams()
  const { openModal } = useAlertModal()
  const postId = searchParams.get('id')

  const [title, setTitle] = useState('')
  const router = useRouter()
  const editorRef = useRef<Editor>(null)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title) {
      // openModal('제목을 입력해주세요.')
      return
    }

    // const markdownContent = editorRef.current?.getInstance().getMarkdown();
    const content = editorRef.current?.getInstance().getHTML()
    if (content === EMPTY_CONTENT) {
      // openModal('내용을 입력해주세요.')
      return
    }
    const data = { title, content }
    if (postId) {
      await $axios.patch(`/api/posts/${postId}`, { ...data, id: postId })
      router.push(`/posts/${postId}`)
    } else {
      const { postId } = await createPost(data)
      if (postId) {
        router.push(`/posts/${postId}`)
      } else {
        openModal('서버에서 오류가 발생했습니다.')
      }

    }

    router.refresh()
  }

  const getPostData = async () => {
    const response = await $axios.get(`/api/posts/${postId}`)
    const postData = response.data.data
    setTitle(postData.title)
    editorRef.current?.getInstance().setHTML(postData.content)
  }
  useEffect(() => {
    if (postId && !title) {
      getPostData()
    }
  }, [postId])

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 pl-1 block w-full rounded-md shadow-sm border focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        <ToastUiEditor editorRef={editorRef} />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {postId ? '수정' : '작성'}
          </button>
        </div>
      </form>
    </div>
  )
}
