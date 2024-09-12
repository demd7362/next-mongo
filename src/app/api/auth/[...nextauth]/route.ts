import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/app/_db/models/User'
import bcrypt from 'bcrypt'
import dbConnect from '@/app/_db/mongo'
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
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
        const user = await User.findOne({ email })
        if (!user) {
          return null
        }
        const dbPassword = user.get('password')
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
          email: user.get('email'),
          nickname: user.get('nickname')
        }
      }
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // account.provider 로 provider 조회 가능
    async jwt({ token, user, account }) {
       return { ...token, ...user }
    },

    async session({ session, token }) {
      session.user.accessToken = token as any
      return session
    }
  }
})
export { handler as GET, handler as POST }
