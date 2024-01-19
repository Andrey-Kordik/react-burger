import React, { FC } from 'react';
import styles from './orders.module.css';
import OrderList from '../../components/order-list/order-list';
import OrdersInfo from '../../components/orders-info/orders-info';

const Orders: FC = () => {
  return (
    <div className={styles.orders}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <div className={styles.orders_container}>
        <OrderList />
        <OrdersInfo />
      </div>
    </div>
  );
};

export default Orders;