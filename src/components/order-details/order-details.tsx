import React, { FC } from 'react';
import styles from './order-details.module.css';
import confirmImage from '../../images/done.png';

interface OrderDetailsProps {
  orderNumber: number;
}

const OrderDetails: FC<OrderDetailsProps> = ({ orderNumber }) => {
  return (
    <div className={styles.order} data-testid='order-modal'>
      <p className={`${styles.order_digits} text text_type_digits-large mb-8`} data-testid="order-number">{orderNumber}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className={styles.order__confirm_image} src={confirmImage} alt="Confirmation" />
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;