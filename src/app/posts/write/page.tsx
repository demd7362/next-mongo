import WriteForm from '@/app/posts/write/_components/WriteForm'
import { Suspense } from 'react'


export default function Page() {
  return (
    <Suspense fallback={null}>
      <WriteForm/>
    </Suspense>
  )
}
