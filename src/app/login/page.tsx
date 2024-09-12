'use client'
import React, { useCallback } from 'react'
import FormInput from '@/components/FormInput'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginFormData {
  email: string;
  password: string;
}

export default function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()
  const router = useRouter()

  const onSubmit = useCallback(async (data: LoginFormData) => {
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })
    if(response?.error){
      alert('로그인 실패')
    } else {
      router.push('/')
    }
  }, [router])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
      <div className="mb-4">
        <FormInput id="email" label="이메일" register={register} validation={{
          required: { value: true, message: '이메일을 입력해주세요.' },
          validate: (value: string) => /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(value) || '이메일 형식에 맞지 않습니다.'
        }} error={errors.email} />
      </div>

      <div className="mb-4">
        <FormInput id="password" label="비밀번호" type="password" register={register} validation={{
          required: {
            value: true,
            message: '비밀번호를 입력해주세요.'
          }, minLength: { value: 6, message: '비밀번호는 6자리 이상 입력해주세요.' }
        }} error={errors.password} />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        로그인
      </button>
    </form>
  )
}
