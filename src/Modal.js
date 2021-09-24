import React from 'react';

export default function Modal({ modalContent, closeModal }) {
  setTimeout(() => {
    closeModal();
  }, 3000);
  return <h1 className="modalcontent">{modalContent}</h1>;
}
