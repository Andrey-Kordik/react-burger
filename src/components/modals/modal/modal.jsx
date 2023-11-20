import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';


const modalRoot = document.getElementById('modal');

function Modal({ children, onClose }) {

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
        <div className={styles.modal__close} >
          <CloseIcon onClick={onClose} />
          </div>
        {children}
      </div>
    ,
    modalRoot
  );
}

export default Modal;