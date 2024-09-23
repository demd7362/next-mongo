import React, { Suspense } from 'react'
import LoginForm from '@/app/login/_components/LoginForm'


export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginForm/>
    </Suspense>
  )
}
