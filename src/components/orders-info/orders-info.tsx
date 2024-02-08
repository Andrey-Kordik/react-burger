import React, { FC } from 'react';
import { useSelector } from '../../services/hooks/hooks';
import styles from './orders-info.module.css';

const OrdersInfo: FC = () => {

  const totalNumber = useSelector((state) => state.allOrders.allOrders.total);
  const totalTodayNumber = useSelector((state) => state.allOrders.allOrders.totalToday);
  const orders = useSelector((state) => state.allOrders.allOrders.orders);


  const doneOrders = orders.filter(order => order.status === 'done').slice(0, 20);

  const workingOrders = orders.filter(order => order.status !== 'done').slice(0, 20);


  return (
    <div className={` ${styles.orders_table} ml-15`}>
      <div className={styles.orders_data}>
        <div className={styles.orders_status}>
          <p className='text text_type_main-medium mb-6'>Готовы:</p>
          <div className={styles.order_number_container}>
          {doneOrders.map((order) => (
              <p className={` ${styles.order_number} text text_type_digits-medium`} key={order.number}>{order.number}</p>

          ))}
            </div>
        </div>
        <div className={styles.orders_status}>
          <p className='text text_type_main-medium mb-6'>В работе:</p>
          <div className={styles.order_number_container}>
          {workingOrders.map((order) => (
              <p className={` ${styles.order_number_undone} text text_type_digits-medium`} key={order.number} >{order.number}</p>
          ))}
            </div>
        </div>
      </div>
      <p className='text text_type_main-medium'>Выполнено за все время:</p>
      <p className={` ${styles.orders_digits} text text_type_digits-large mb-15`}>{totalNumber}</p>
      <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
      <p className={` ${styles.orders_digits} text text_type_digits-large mb-15`}>{totalTodayNumber}</p>
    </div>
  );
};

export default OrdersInfo;