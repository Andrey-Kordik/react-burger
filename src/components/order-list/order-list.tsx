import React, { FC } from 'react';
import styles from './order-list.module.css';
import OrderItem from '../order-item/order-item';
import {  useMatch } from 'react-router-dom';
import { useSelector } from '../../services/hooks/hooks';
import Preloader from '../Preloader/Preloader';
import { RootState } from '../../services/types/types';
import { createSelector } from 'reselect';

const OrderList: FC = () => {
  const match = useMatch('/feed');
  const isFeedPage = !!match;
  const maxWidth = isFeedPage ? '600px' : '860px';


  const selectAllOrders = (state: RootState) => state.allOrders.allOrders.orders;
  const selectMyOrders = (state: RootState) => state.myOrders.myOrders.orders;

  const ordersSelector = createSelector(
    selectAllOrders,
    selectMyOrders,
    (allOrders, myOrders) => (isFeedPage ? allOrders : [...myOrders].reverse())
  );

  const orders = useSelector(ordersSelector);


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