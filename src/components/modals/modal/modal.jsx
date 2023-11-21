import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById('modal');

function Modal({ children, onClose, headerHeading }) {

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);

    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <header className={styles.modal_header}>
        <h1 className="text text_type_main-large">{headerHeading}</h1>
        <CloseIcon onClick={onClose} />
      </header>
      {children}
    </div>
    ,
    modalRoot
  );
}

export default Modal;