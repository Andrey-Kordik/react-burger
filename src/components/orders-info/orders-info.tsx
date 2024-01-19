import React, { FC } from 'react';
import styles from './orders-info.module.css';

const OrdersInfo: FC = () => {
  return (
    <div className={` ${styles.orders_table} ml-15`}>
    <div className={styles.orders_data}>
      <div className={styles.orders_status}>
        <p className='text text_type_main-medium mb-6'>Готовы:</p>
        <p className={` ${styles.order_number} text text_type_digits-medium`}>312312</p>
      </div>
      <div className={styles.orders_status}>
        <p className='text text_type_main-medium mb-6'>В работе:</p>
        <p className= 'text text_type_digits-medium'>312323</p>
      </div>
    </div>
    <p className='text text_type_main-medium'>Выполнено за все время:</p>
    <p className={` ${styles.orders_digits} text text_type_digits-large mb-15`}>12345</p>
    <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
    <p className={` ${styles.orders_digits} text text_type_digits-large mb-15`}>123</p>
    </div>
  );
};

export default OrdersInfo;