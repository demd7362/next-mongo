'use client'
import React, { FormEvent, useState } from 'react'
import { X } from 'lucide-react'
import { useInputModal } from '@/store/modalStore'


export default function InputModal() {
  const { modalName, closeModal, isOpen, content, setContent } = useInputModal()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    closeModal()
  }
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">{modalName}</h3>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="여기에 입력하세요..." />
          <div className="mt-4 flex justify-end space-x-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              취소
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              제출
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};
