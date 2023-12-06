import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';


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
    <>
      <ModalOverlay
        onClose={onClose} />
      <div className={styles.modal}>
        <header className={styles.modal_header}>
          <h1 className="text text_type_main-large">{headerHeading}</h1>
          <CloseIcon onClick={onClose} />
        </header>
        {children}
      </div>
    </>
    ,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  headerHeading: PropTypes.string.isRequired,
};

export default Modal;