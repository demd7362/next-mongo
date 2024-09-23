'use client'
import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/FormInput'
import { UserPlus } from 'lucide-react'
import { signUp } from '@/app/actions'
import { useAlertModal } from '@/store/modalStore'

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Page() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpFormData>()
  const router = useRouter()
  const { openModal } = useAlertModal()
  const onSubmit = useCallback(async (data: SignUpFormData) => {
    const isCreated = await signUp(data)
    if (isCreated) {
      router.push('/login')
    } else {
      openModal('서버에서 에러가 발생했습니다.')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">회원가입</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          이미 계정이 있으신가요? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"> 로그인 </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput id="username" label="닉네임" register={register} validation={{
              required: { value: true, message: '닉네임을 입력해주세요.' },
              minLength: { value: 2, message: '닉네임은 2자 이상이어야 합니다.' }
            }} error={errors.username} />

            <FormInput id="email" label="이메일" type="text" register={register} validation={{
              required: { value: true, message: '이메일을 입력해주세요.' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '유효한 이메일 주소를 입력해주세요.'
              }
            }} error={errors.email} />

            <FormInput id="password" label="비밀번호" type="password" register={register} validation={{
              required: { value: true, message: '비밀번호를 입력해주세요.' },
              minLength: { value: 6, message: '비밀번호는 6자리 이상이어야 합니다.' }
            }} error={errors.password} />

            <FormInput id="confirmPassword" label="비밀번호 확인" type="password" register={register} validation={{
              required: { value: true, message: '비밀번호 확인을 입력해주세요.' },
              validate: (value: string) => value === watch('password') || '비밀번호가 일치하지 않습니다.'
            }} error={errors.confirmPassword} />

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                <UserPlus className="mr-2 h-5 w-5" /> 가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
