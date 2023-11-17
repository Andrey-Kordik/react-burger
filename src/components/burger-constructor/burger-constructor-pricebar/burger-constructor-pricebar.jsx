import React from 'react';
import styles from './burger-constructor-pricebar.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
function BurgerConstructorPriceBar() {


  return (
    <div className={` ${styles.burger_pricebar} pt-10`}>
      <div className={` ${styles.burger_price} pr-10`}>
        <p className='text text_type_digits-medium pr-2'>610</p>
        <CurrencyIcon />
      </div>
      <Button htmlType="button" type="primary" size="medium">
        Оформить заказ
      </Button>
    </div>

  );
}

export default BurgerConstructorPriceBar;