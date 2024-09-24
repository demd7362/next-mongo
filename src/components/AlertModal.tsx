'use client'

import React from 'react'
import Modal from 'react-modal'
import { useAlertModal } from '@/store/modalStore'
import { XIcon } from 'lucide-react'

// 모달 스타일
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '90%',
    width: '400px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: 'none',
  },
};

// 앱의 루트 요소 설정 (필수)
// if (typeof window !== 'undefined') {
//   Modal.setAppElement('#__next');
// }

export default function AlertModal() {
  const { isOpen, content, closeModal } = useAlertModal()

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Alert Modal"
    >
      <div className="flex flex-col">
        <button
          onClick={closeModal}
          className="self-end text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <XIcon size={24} />
        </button>
        <div className="mt-2 mb-6 text-center">
          <p className="text-lg text-gray-800">{content}</p>
        </div>
        <button
          onClick={closeModal}
          className="click w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
        >
          확인
        </button>
      </div>
    </Modal>
  );
}
