'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'
import $axios from '@/utils/axios'
import ToastUiEditor from '@/components/ToastUiEditor'
import { Editor } from '@toast-ui/react-editor'
import { createPost } from '@/app/actions'
import { useAlertModal } from '@/store/modalStore'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const EMPTY_CONTENT = '<p><br></p>'

// next build 시 navigator is not defined 에러 해결을 위해 lazy loading
const DynamicEditor = dynamic(() => import('@/components/ToastUiEditor'), {
  ssr: false
})

export default function WriteForm() {
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="제목을 입력하세요" />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
          <DynamicEditor editorRef={editorRef} />
        </div>

        <div className="flex justify-end space-x-4">
          <Link href="/posts" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> 목록 </Link>
          <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {postId ? '수정' : '작성'}
          </button>
        </div>
      </form>
    </div>
  )
}
