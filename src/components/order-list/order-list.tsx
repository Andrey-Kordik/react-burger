import React, { FC } from 'react';
import styles from './order-list.module.css';
import OrderItem from '../order-item/order-item';
import {  useMatch } from 'react-router-dom';
import { useSelector } from '../../services/hooks/hooks';
import Preloader from '../Preloader/Preloader';


const OrderList: FC = () => {
  const match = useMatch('/feed');
  const isFeedPage = !!match;
  const maxWidth = isFeedPage ? '600px' : '860px';

  const orders = useSelector((state) => {
    if (isFeedPage) {
      return state.allOrders.allOrders.orders;
    } else {
      return [...state.myOrders.myOrders.orders].reverse();
    }
  });

  if (!orders) {
    return <Preloader />;
  }



  return (
    <div className={`${styles.list} custom-scroll`} style={{ maxWidth }}>
      {orders.map((order) => (
        <OrderItem key={order.number} order={order} />
      ))}
    </div>
  );
};

export default OrderList;