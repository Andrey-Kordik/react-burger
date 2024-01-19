import React, { FC } from 'react';
import styles from './order-list.module.css';
import OrderItem from '../order-item/order-item';
import { useLocation } from 'react-router-dom';

const OrderList: FC = () => {
  const location = useLocation();

  const maxWidth = location.pathname.includes('/feed') ? '600px' : '860px';

  return (
    <div className={`${styles.list} custom-scroll`} style={{ maxWidth }}>
      <OrderItem />
    </div>
  );
};

export default OrderList;