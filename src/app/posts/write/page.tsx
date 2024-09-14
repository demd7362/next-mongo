'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'
import $axios from '@/utils/axios'
import ToastUiEditor from '@/components/ToastUiEditor'
import { Editor } from '@toast-ui/react-editor'

export default function Page() {
  const searchParams = useSearchParams()
  const objectId = searchParams.get('id')

  const [title, setTitle] = useState('')
  const router = useRouter()
  const editorRef = useRef<Editor>(null)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // const markdownContent = editorRef.current?.getInstance().getMarkdown();
    const content = editorRef.current?.getInstance().getHTML()
    const body = { title, content }
    if (objectId) {
      await $axios.patch(`/api/posts/${objectId}`, {...body, id: objectId})
      alert('수정 완료')
    } else {
      await $axios.post('/api/posts', body)
      alert('작성 완료')
    }
    router.push('/posts')
    router.refresh()
  }

  const handleImage = () => {

  }
  const getPostData = async () => {
    const response = await $axios.get(`/api/posts/${objectId}`)
    const postData = response.data.data
    setTitle(postData.title)
    editorRef.current?.getInstance().setHTML(postData.content)
  }
  useEffect(() => {
    if(objectId && !title){
      getPostData()
    }
  },[objectId])

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        <ToastUiEditor editorRef={editorRef} imageHandler={handleImage} />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {objectId ? '수정' : '작성'}
          </button>
        </div>
      </form>
    </div>
  )
}
