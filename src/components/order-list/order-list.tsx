import React, { FC } from 'react';
import styles from './order-list.module.css';
import OrderItem from '../order-item/order-item';
import { useLocation, useMatch } from 'react-router-dom';
import { useSelector } from '../../services/hooks/hooks';
import Preloader from '../Preloader/Preloader';


const OrderList: FC = () => {
  const location = useLocation();

  const maxWidth = location.pathname.includes('/feed') ? '600px' : '860px';
  const orders = location.pathname.includes('/feed')
  ? useSelector((state) => state.allOrders.allOrders.orders)
  : useSelector((state) => state.myOrders.myOrders.orders);



  return (
    <div className={`${styles.list} custom-scroll`} style={{ maxWidth }}>
    {orders.map((order) => (
        <OrderItem key={order.number} order={order} />
      ))}
    </div>
  );
};

export default OrderList;