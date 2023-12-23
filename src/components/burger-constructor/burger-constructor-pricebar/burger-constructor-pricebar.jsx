import React from 'react';
import styles from './burger-constructor-pricebar.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modals/modal/modal';
import OrderDetails from '../../order-details/order-details';
import { useDispatch, useSelector } from "react-redux";
import { loadOrderNumber, clearOrderNumber} from '../../../services/order-details/actions'
import {  useNavigate  } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader';

function BurgerConstructorPriceBar({ totalPrice, ings, bun }) {
  const dispatch = useDispatch();
const navigate= useNavigate()

  const components = [...ings, bun];
  const ids = [];
  let bunId = null;
  let hasBun = false;
  let hasMain = false;
  let hasSauce = false;



  components.forEach((ingredient) => {
    if (ingredient && ingredient.type === "bun") {
      bunId = ingredient._id;
      ids.unshift(bunId);
      hasBun = true;
    } else if (ingredient && ingredient.type === "main") {
      hasMain = true;
    } else if (ingredient && ingredient.type === "sauce") {
      hasSauce = true;
    }
    if (ingredient) {
      ids.push(ingredient._id);
    }
  });

  if (bunId) {
    ids.push(bunId);
  }

  const { orderNumber, loading } = useSelector((state) => state.orderNumber);
  const user = useSelector((state) => state.authReducer.user);
  const handleOrderSubmit = () => {
    if (user) {
      dispatch(loadOrderNumber(ids)).catch((error) => {
        console.error(error);
      });
    } else {
      navigate('/login');
    }
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
      {loading && (
        <Modal onClose={handleOrderModalClose} headerHeading="Пожалуйста подождите...">
          <Preloader />
        </Modal>
      )}
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
  ings: PropTypes.array.isRequired,
  bun: PropTypes.object,
};

export default BurgerConstructorPriceBar;