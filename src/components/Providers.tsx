'use client'
import { createContext, ReactNode, useCallback, useState } from 'react'
import { SessionProvider } from 'next-auth/react'

interface IModalContext {
  isOpen: boolean
  closeModal: () => void
  openModal: () => void
}

export const ModalContext = createContext<IModalContext | null>(null)
export default function Providers({ children }: { children: ReactNode }) {

  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
