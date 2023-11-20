import React from 'react';
import styles from './burger-constructor-pricebar.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modals/modal/modal';
import ModalOverlay from '../../modals/modal-overlay/modal-overlay';
import OrderDetails from '../../order-details/order-details';

function BurgerConstructorPriceBar({ onOpenWindow, isModalOpen, onCloseModal }) {

  return (
    <div className={` ${styles.burger_pricebar} pt-10`}>
      <div className={` ${styles.burger_price} pr-10`}>
        <p className='text text_type_digits-medium pr-2'>610</p>
        <CurrencyIcon />
      </div>
      <Button onClick={onOpenWindow} type="primary" htmlType='button'>
        Оформить заказ
      </Button>
      {isModalOpen && (
        <>
          <Modal  onClose={onCloseModal}>
            <OrderDetails />
            </Modal>
          <ModalOverlay
            onClose={onCloseModal} />
        </>
      )}
    </div>
  );
}

export default BurgerConstructorPriceBar;