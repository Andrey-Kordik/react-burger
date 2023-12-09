import React from 'react';
import styles from './burger-constructor-pricebar.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modals/modal/modal';
import OrderDetails from '../../order-details/order-details';
import { useDispatch, useSelector } from "react-redux";
import { loadOrderNumber, clearOrderNumber} from '../../../services/order-details/actions'

function BurgerConstructorPriceBar({ totalPrice, ings }) {
  const dispatch = useDispatch();

  const ids = [];
  let bunId = null;
  let hasBun = false;
  let hasMain = false;
  let hasSauce = false;

  ings.forEach((ingredient) => {
    if (ingredient.type === "bun") {
      bunId = ingredient._id;
      ids.unshift(bunId);
      hasBun = true;
    } else if (ingredient.type === "main") {
      hasMain = true;
    } else if (ingredient.type === "sauce") {
      hasSauce = true;
    }
    ids.push(ingredient._id);
  });

  if (bunId) {
    ids.push(bunId);
  }

  const orderNumber = useSelector((state) => state.orderNumber.orderNumber);

  const handleOrderSubmit = () => {
    dispatch(loadOrderNumber(ids)).catch((error) => {
      console.error(error);
    });
  };

  const handleOrderModalClose = () => {
    dispatch(clearOrderNumber());
  };

  const isButtonActive = hasBun && hasMain && hasSauce;

  return (
    <div className={`${styles.burger_pricebar} pt-10`}>
      <div className={`${styles.burger_price} pr-10`}>
        <p className="text text_type_digits-medium pr-2">{totalPrice}</p>
        <CurrencyIcon />
      </div>
      <Button onClick={handleOrderSubmit} type="primary" htmlType="button" disabled={!isButtonActive}>
        Оформить заказ
      </Button>
      {orderNumber && (
        <Modal onClose={handleOrderModalClose} headerHeading="">
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
}


BurgerConstructorPriceBar.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  ings: PropTypes.array.isRequired
};

export default BurgerConstructorPriceBar;