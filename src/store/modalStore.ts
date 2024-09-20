import { create } from 'zustand'


interface AlertModalState {
  isOpen: boolean
  content: string
  openModal: (content: string) => void
  closeModal: () => void
  setCallback: (callback: Function) => void
  callback?: Function
}

export const useAlertModal = create<AlertModalState>((set, get) => ({
  isOpen: false,
  content: '',
  setCallback: (callback: Function) => set(({ callback })),
  openModal: (content) => set(({ isOpen: true, content })),
  closeModal: async () => {
    const state = get()
    await state.callback?.()
    set(() => ({ isOpen: false }))
  }
}))

interface InputModalState {
  isOpen: boolean
  modalName: string
  content: string
  openModal: (modalName: string) => void
  closeModal: () => void
  setContent: (content: string) => void
  callback?: Function
  setCallback: (callback: Function) => void
}

export const useInputModal = create<InputModalState>((set, get) => ({
  isOpen: false,
  modalName: '',
  content: '',
  openModal: (modalName: string) => set({ isOpen: true, modalName }),
  closeModal: async () => {
    const state = get()
    await state.callback?.()
    set(() => ({ isOpen: false, content: '' }))
  },
  setContent: (content: string) => set({ content }),
  setCallback: (callback: Function) => set({ callback })
}))
