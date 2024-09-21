'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import kakaoLogin from '@/static/kakao_login_large_narrow.png'
import { Loader2, LogIn, LogOut, MessageSquare, UserPlus } from 'lucide-react'

export default function MainButtonWrapper() {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      {session ? (
        <button className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={() => signOut()}>
          <LogOut className="mr-2 h-5 w-5" /> 로그아웃 </button>
      ) : (
        <>
          <Link href="/login">
            <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
              <LogIn className="mr-2 h-5 w-5" /> 로그인
            </button>
          </Link>
          <button className="flex items-center justify-center" onClick={() => signIn('kakao')}>
            <Image src={kakaoLogin} width={183} height={45} alt="Kakao Login" className="rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1" priority quality={100} />
          </button>
        </>
      )}
      <Link href="/join">
        <button className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <UserPlus className="mr-2 h-5 w-5" /> 회원가입
        </button>
      </Link>
      <Link href="/posts">
      <button className="flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
        <MessageSquare className="mr-2 h-5 w-5" /> 게시판
      </button>
      </Link>
    </div>
  )
}
