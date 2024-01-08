import React, { FC } from 'react';
import styles from './burger-constructor-pricebar.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modals/modal/modal';
import OrderDetails from '../../order-details/order-details';
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD:src/components/burger-constructor/burger-constructor-pricebar/burger-constructor-pricebar.tsx
import { loadOrderNumber, clearOrderNumber } from '../../../services/order-details/actions'
import { useNavigate } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader';
import { IIngredient } from '../../app/app';

interface BurgerConstructorPriceBarProps {
  totalPrice: number;
  ings: IIngredient[];
  bun: IIngredient | null;
}

const BurgerConstructorPriceBar: FC<BurgerConstructorPriceBarProps> = ({ totalPrice, ings, bun }) => {
=======
import { loadOrderNumber, clearOrderNumber} from '../../../services/order-details/actions'
import {  useNavigate  } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader';
>>>>>>> main:src/components/burger-constructor/burger-constructor-pricebar/burger-constructor-pricebar.jsx

  const dispatch = useDispatch();
<<<<<<< HEAD:src/components/burger-constructor/burger-constructor-pricebar/burger-constructor-pricebar.tsx
  const navigate = useNavigate()
=======
const navigate= useNavigate()
>>>>>>> main:src/components/burger-constructor/burger-constructor-pricebar/burger-constructor-pricebar.jsx

  const components = [...ings, bun];
  const ids: string[] = [];
  let bunId: string | null = null;
  let hasBun: boolean = false;
  let hasMain: boolean = false;
  let hasSauce: boolean = false;

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
<<<<<<< HEAD:src/components/burger-constructor/burger-constructor-pricebar/burger-constructor-pricebar.tsx
  //@ts-ignore
  const { orderNumber, loading } = useSelector((state) => state.orderNumber);
    //@ts-ignore
  const user = useSelector((state) => state.authReducer.user);

  const handleOrderSubmit = () => {
    if (user) {
        //@ts-ignore
      dispatch(loadOrderNumber(ids)).catch((error) => {
        console.log(error);
=======

  const { orderNumber, loading } = useSelector((state) => state.orderNumber);
  const user = useSelector((state) => state.authReducer.user);
  const handleOrderSubmit = () => {
    if (user) {
      dispatch(loadOrderNumber(ids)).catch((error) => {
        console.error(error);
>>>>>>> main:src/components/burger-constructor/burger-constructor-pricebar/burger-constructor-pricebar.jsx
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
        <CurrencyIcon type="primary" />
      </div>
      <Button onClick={handleOrderSubmit} type="primary" htmlType="button" disabled={!isButtonActive}>
        Оформить заказ
      </Button>
      {loading && (
        <Modal onClose={handleOrderModalClose} headerHeading="Пожалуйста подождите...">
<<<<<<< HEAD:src/components/burger-constructor/burger-constructor-pricebar/burger-constructor-pricebar.tsx
          <Preloader />
=======
           return <Preloader />
>>>>>>> main:src/components/burger-constructor/burger-constructor-pricebar/burger-constructor-pricebar.jsx
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


export default BurgerConstructorPriceBar;