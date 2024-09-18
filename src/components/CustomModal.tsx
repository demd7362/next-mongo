'use client'

import ReactModal from 'react-modal'
import React, { createContext, useContext, useState } from 'react'
import Modal from 'react-modal';
import { ModalContext } from '@/components/Providers'

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


export default function CustomModal() {
  const { isOpen, closeModal, openModal } = useContext(ModalContext)!;

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        모달 열기
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-2xl font-bold mb-4">모달 제목</h2>
        <p className="mb-4">모달 내용입니다.</p>
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
