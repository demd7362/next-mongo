'use client'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Page() {
  const router = useRouter()
  const session = useSession()
  console.log(session)
  return (
    <div className='flex-col space-y-2'>
      <button onClick={() => router.push('/join')}>
        회원가입
      </button>
      <br />
      <button onClick={() => router.push('/login')}>
        로그인
      </button>
      <br />
      <button onClick={() => router.push('/posts')}>
        게시판
      </button>
      <br />
      <button onClick={async (e) => {
        await signIn('kakao')
      }}>
        카카오 로그인
      </button>
      <br /> {session.data && <button onClick={() => signOut()}>
      로그아웃 </button>} <br />
    </div>
  )
}
