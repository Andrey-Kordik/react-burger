import React, { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { useLocation } from 'react-router-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  headerHeading: string;
}

const modalRoot = document.getElementById('modal');

const Modal: FC<ModalProps> = ({ children, onClose, headerHeading }) => {

  const location = useLocation();
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown );
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  let headerClassName = "text text_type_digits-default";
  if (location.pathname.includes('/ingredients')) {
    headerClassName = "text text_type_main-large";
  }


 return modalRoot ? ReactDOM.createPortal(
    <>
      <ModalOverlay
        onClose={onClose} />
      <div className={styles.modal}>
        <header className={styles.modal_header}>
          <h1 className={headerClassName}>{headerHeading}</h1>
          <CloseIcon type='primary' onClick={onClose} />
        </header>
        {children}
      </div>
    </>
    ,
    modalRoot
    ) : null;
}


export default Modal;