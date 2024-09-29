import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'
import InputModal from '@/components/InputModal'
import AlertModal from '@/components/AlertModal'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Roboto } from 'next/font/google'



export const metadata: Metadata = {
  title: 'Next.js + Mongoose Demo',
  description: 'Next.js + Mongoose Demo App'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
    <Providers>
      <AlertModal />
      <InputModal />
      <SpeedInsights />
      {children}
    </Providers>
    </body>
    </html>
  )
}
