import React, { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  headerHeading: string;
}

const modalRoot = document.getElementById('modal');

const Modal: FC<ModalProps> = ({ children, onClose, headerHeading }) => {

  const handleKeyDown = (e: KeyboardEvent) => {
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

  return modalRoot ? ReactDOM.createPortal(
    <>
      <ModalOverlay
        onClose={onClose} />
      <div className={styles.modal}>
        <header className={styles.modal_header}>
          <h1 className="text text_type_main-large">{headerHeading}</h1>
          <div className={styles.modal_close_button} data-testid='close-icon'>
          <CloseIcon type='primary' onClick={onClose} />
          </div>
        </header>
        {children}
      </div>
    </>
    ,
    modalRoot
  ) : null;
}


export default Modal;