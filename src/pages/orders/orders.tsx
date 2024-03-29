import React, { FC } from 'react';
import styles from './orders.module.css';
import OrderList from '../../components/order-list/order-list';
import OrdersInfo from '../../components/orders-info/orders-info';
import Preloader from '../../components/Preloader/Preloader';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import {
  allOrdersConnect,
  allOrdersDisconnect,
} from "../../services/ws-all-orders/actions";
import { useEffect } from 'react';
import { ALL_ORDERS_SERVER_URL } from '../../utils/constants';

const Orders: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.allOrders.loading);

  useEffect(() => {
    dispatch(allOrdersConnect(ALL_ORDERS_SERVER_URL));
    return () => {
      dispatch(allOrdersDisconnect());
    };
  }, []);


  if (loading) {
    return <Preloader />;
  }
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