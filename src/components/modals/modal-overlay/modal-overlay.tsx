import React, { FC, MouseEvent } from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
  const handleClick = (e: MouseEvent) => {
    onClose();
  };

  return (
    <div className={styles.modal_overlay} onClick={handleClick}></div>
  );
}

export default ModalOverlay;