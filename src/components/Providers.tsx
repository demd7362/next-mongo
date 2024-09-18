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
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = useCallback(() => setIsOpen(false), [])
  const openModal = useCallback(() => setIsOpen(true), [])

  return (
    <ModalContext.Provider value={{closeModal, openModal, isOpen}}>
      <SessionProvider>{children}</SessionProvider>
    </ModalContext.Provider>
  )
}
