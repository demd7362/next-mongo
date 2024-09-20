'use client'

import ReactModal from 'react-modal'
import React, { createContext, useContext, useState } from 'react'
import Modal from 'react-modal';
import { ModalContext } from '@/components/Providers'
import { useAlertModal } from '@/store/modalStore'

// 모달 스타일
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// 앱의 루트 요소 설정 (필수)
// Modal.setAppElement('#__next');


export default function AlertModal() {
  const { isOpen,content, closeModal } = useAlertModal()

  if(!isOpen) return null

  return (
    <div className="p-4 z-50">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p className="mb-4">{content}</p>
        <button
          onClick={closeModal}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          닫기
        </button>
      </Modal>
    </div>
  );
};
