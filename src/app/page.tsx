'use client'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Page() {
  const router = useRouter()
  const session = useSession()
  return (
    <div className='flex-row space-y-2'>
      <button onClick={() => router.push('/join')}>
        회원가입
      </button>
      <button onClick={() => router.push('/login')}>
        로그인
      </button>
      <button onClick={() => signOut()}>
        로그아웃
      </button>
      {JSON.stringify(session)}
    </div>
  )
}
