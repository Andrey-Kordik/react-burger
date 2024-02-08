import React, { FC, useEffect } from 'react';
import styles from './order-list.module.css';
import OrderItem from '../order-item/order-item';
import {  useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import Preloader from '../Preloader/Preloader';
import { MY_ORDERS_SERVER_URL } from '../../utils/constants';
import { myOrdersConnect, myOrdersDisconnect } from '../../services/ws-my-orders/actions';

const OrderList: FC = () => {
  const match = useMatch('/feed');
  const isFeedPage = !!match;
  const maxWidth = isFeedPage ? '600px' : '860px';

  const dispatch = useDispatch();

  const orders = useSelector(store => {
    return (isFeedPage ? store.allOrders.allOrders.orders : store.myOrders.myOrders.orders);
  });

  useEffect(() => {
    if (!isFeedPage) {
      const accessToken = localStorage.getItem('accessToken');
      const cleanedAccessToken = accessToken?.replace("Bearer ", "")
      const ordersServerUrlWithToken = `${MY_ORDERS_SERVER_URL}?token=${cleanedAccessToken}`;
      dispatch(myOrdersConnect(ordersServerUrlWithToken));
      return () => {
        dispatch(myOrdersDisconnect());
      }
    }
  }, []);

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