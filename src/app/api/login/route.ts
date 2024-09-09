import User from '@/app/_db/models/User'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import dbConnect from '@/app/_db/mongo'
import { NextResponse } from 'next/server'

const SECRET_KEY = process.env.SECRET_KEY!

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const { email, password: plainPassword} = body
  const user = await User.findOne({ email }).select('password')
  if (!user) {
    return NextResponse.json({
      status: 400,
      message: '존재하지 않는 이메일입니다.'
    })
  }
  const dbPassword = user.get('password')
  const bcrypt = require('bcrypt')
  const isMatch = await bcrypt.compare(plainPassword, dbPassword)
  if (!isMatch) {
    return NextResponse.json({
      status: 400,
      message: '비밀번호가 일치하지 않습니다.'
    })
  }
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' })
  const response = NextResponse.json({ status: 200 })
  response.headers.set('Set-Cookie', serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서만 Secure 플래그 설정
    maxAge: 3600, // 쿠키 만료 기간
    path: '/' // 쿠키의 유효 경로
  }))

  return response
}
