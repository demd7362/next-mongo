import { create } from 'zustand'


interface AlertModalState {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useAlertModal = create<AlertModalState>((set) => ({
  isOpen: false,
  openModal: () => set(({ isOpen: true })),
  closeModal: () => set(({ isOpen: false }))
}))

interface InputModalState {
  isOpen: boolean
  modalName: string
  content: string
  openModal: (modalName: string) => void
  closeModal: () => void
  setContent: (content: string) => void
  callback: Function
  setCallback: (callback: Function) => void
}

export const useInputModal = create<InputModalState>((set, get) => ({
  isOpen: false,
  modalName: '',
  content: '',
  openModal: (modalName: string) => set({ isOpen: true, modalName }),
  closeModal: async () => {
    const state = get()
    await state.callback()
    state.isOpen = false
    state.content = ''
  },
  setContent: (content: string) => set({ content }),
  callback: () => {},
  setCallback: (callback: Function) => set({ callback })
}))
