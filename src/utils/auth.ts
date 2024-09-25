import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import { getServerSession, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from '@/app/_db/mongo'
import User from '@/app/_db/models/User'
import bcrypt from 'bcrypt'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      // @ts-ignore
      async authorize(credentials) {
        await dbConnect()
        if (!credentials) {
          return null
        }
        const { email, password } = credentials
        if (!email || !password) {
          return null
        }
        const $user = await User.findOne({ email })
        if (!$user) {
          return null
        }
        const dbPassword = $user.get('password')
        const isMatch = await bcrypt.compare(password, dbPassword)
        if (!isMatch) {
          return null
        }
        // 자동으로 jwt로 인코딩되므로 필요 없음, 미들웨어에서도 검증 과정이 필요 없음
        // const accessToken = sign(userWithoutPassword)
        // const result = {
        //   ...userWithoutPassword,
        //   accessToken
        // }

        return {
          email: $user.get('email'),
          name: $user.get('nickname'),
          objectId: $user.get('_id')
        }
      }
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7200
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    // account.provider 로 provider 조회 가능
    async jwt({ token, user, account, profile }) {
      if (account?.provider && account.provider !== 'credentials') {
        await dbConnect()
        const uniqueValue = `${account.provider}$${account.providerAccountId}`
        let $user = await User.findOne({ email: uniqueValue })
        console.log('user, uv', $user, uniqueValue)
        if (!$user) {
          $user = await User.create({
            nickname: uniqueValue,
            password: uniqueValue,
            email: uniqueValue,
            provider: account.provider
          })
          if (!$user) {
            throw new Error('Failed to create user.')
          }
        }
        token.objectId = $user.get('_id')
      }
      return { ...token, ...user }
    },

    async session({ session, token, user }) {
      session.user.token = token as any
      return session
    }
  }
}


export const getUsernameByToken = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return null
  }
  const author = token.name
  return author
}

export const getUsernameBySession = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return null
  }
  const username = session.user.token.name
  return username
}

export const getUserIdBySession = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return null
  }
  const id = session.user.token.objectId
  return id
}
