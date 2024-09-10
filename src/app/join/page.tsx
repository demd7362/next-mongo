'use client'
import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/FormInput'
import axios from 'axios'

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>()
  const router = useRouter()
  const onSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      await axios.post('/api/users', data)
      router.push('/login')
    } catch (e) {
      throw e
    }
  }, [router])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
      <div className="mb-4">
        <FormInput id="nickname" label="닉네임" register={register} validation={{
          required: { value: true, message: '닉네임을 입력해주세요.' },
          validate: (value: string) => !!value
        }} error={errors.username} />
      </div>

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
      <div className="mb-6">
        <FormInput id="confirmPassword" label="비밀번호 확인" type="password" register={register} validation={{
          required: { value: true, message: '비밀번호 확인값을 입력해주세요.' },
          validate: (value: string, formValues: SignUpFormData) => value === formValues.password || '비밀번호가 일치하지 않습니다.'
        }} error={errors.confirmPassword} />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        가입하기
      </button>
    </form>
  )
};

