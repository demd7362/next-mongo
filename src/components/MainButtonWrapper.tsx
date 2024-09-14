'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import kakaoLogin from '@/static/kakao_login_large_narrow.png'

export default function MainButtonWrapper() {
  const session = useSession()
  if(session.status === 'loading'){
    return <div>loading...</div>
  }
  return (
    <div className="flex space-x-4">
      {session.data ? (
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded" onClick={() => signOut()}>
            로그아웃 </button>
        ) :
        <>
          <Link href="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded">
              로그인
            </button>
          </Link>
          <Image src={kakaoLogin} width={183} height={45} alt="Kakao Login" className="cursor-pointer" onClick={() => signIn('kakao')} priority quality={100} style={{ imageRendering: 'crisp-edges' }} />
        </>
      } <Link href="/join">
      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded">
        회원가입
      </button>
    </Link> <Link href="/posts">
      <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded">
        게시판
      </button>
    </Link>
    </div>
  )
}
