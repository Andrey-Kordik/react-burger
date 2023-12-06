import React from 'react';
import styles from './burger-constructor-pricebar.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modals/modal/modal';
import OrderDetails from '../../order-details/order-details';
import { useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrderNumber} from '../../../services/order-details/actions'

function BurgerConstructorPriceBar({ onOpenWindow, isModalOpen, onCloseModal, totalPrice, ings}) {

  const dispatch = useDispatch();

const ids= [];
let bunId = null;

ings.forEach((ingredient) => {
  if (ingredient.type === 'bun') {
    bunId = ingredient._id;
    ids.unshift(bunId);
  } else {
    ids.push(ingredient._id);
  }
});

if (bunId) {
  ids.push(bunId);
}

  const orderNumber = useSelector((state) => state.orderNumber.orderNumber);

  const handleOrderSubmit = () => {
    dispatch(loadOrderNumber(ids))
      .catch((error) => {
        console.error(error);
      });
  };

console.log(ids)

  return (
    <div className={` ${styles.burger_pricebar} pt-10`}>
      <div className={` ${styles.burger_price} pr-10`}>
        <p className='text text_type_digits-medium pr-2'>{totalPrice}</p>
        <CurrencyIcon />
      </div>
      <Button onClick={handleOrderSubmit} type="primary" htmlType='button'>
        Оформить заказ
      </Button>
      {orderNumber && (
        <Modal onClose={onCloseModal}
          headerHeading="">
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
}

BurgerConstructorPriceBar.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onOpenWindow: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default BurgerConstructorPriceBar;