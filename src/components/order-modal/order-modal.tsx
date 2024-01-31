import React, { FC, useEffect } from 'react';
import styles from './order-modal.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Order } from '../../services/types/types'
import { useParams } from 'react-router-dom';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { getCurrentOrder } from '../../services/auth/actions'
import { IIngredient } from '../../services/types/types';
import Preloader from '../Preloader/Preloader';
import {
  allOrdersConnect,
  allOrdersDisconnect,
} from "../../services/ws-all-orders/actions";
import { ALL_ORDERS_SERVER_URL } from '../../utils/constants';

interface OrderModalProps {
  background: string | undefined;
  myOrders: Order[]
  allOrders: Order[]
  ingredients: IIngredient[]
}

const OrderModal: FC<OrderModalProps> = ({ allOrders, myOrders, background, ingredients }) => {


  const dispatch = useDispatch()
  const { number } = useParams();

  const parsedOrderNumber: number = Number(number)

  const order = useSelector((store) => {
    let order = allOrders.find((order: Order) => order.number === parsedOrderNumber);
    console.log()
    if (order) {
      return order;
    }

    order = myOrders.find((order: Order) => order.number === parsedOrderNumber);
    if (order) {
      return order;
    }

    return store.authReducer.currentOrder
  });

  useEffect(() => {
    if (!order) {
      dispatch(getCurrentOrder(parsedOrderNumber))
    }
  }, [])


  if (!order) {
    return <Preloader />
  }

  const modalStyle = background ? {} : { marginTop: '120px' };
  const modalHeadingStyle = background ? {} : { left: '50%' };

  const uniqueIngredients = new Set(order?.ingredients);

  const totalOrderPrice = Array.from(uniqueIngredients).reduce((total, ingredientId) => {
    const ingredientInfo = ingredients.find((ing) => ing._id === ingredientId);
    const ingredientQuantity = ingredientInfo?.type === 'bun' ? 2 : 1;
    return total + (ingredientInfo?.price || 0) * ingredientQuantity;
  }, 0);

  return (
    <div className={styles.order_modal} style={modalStyle}>
      {order ? (
        <>
          <p className={`${styles.order_modal_heading} text text_type_digits-default`} style={modalHeadingStyle}>{`# ${number}`}</p>
          <p className={` ${styles.order_modal_burger} text text_type_main-medium mt-10 mb-2`}>{order.name}</p>
          {order.status === 'done' && (
            <p className={` ${styles.item__done} text text_type_main-default`}>Выполнен</p>
          )}
          {order.status === 'pending' && (
            <p className={` ${styles.item__preparing} text text_type_main-default`}>Готовится</p>
          )}
          {order.status === 'created' && (
            <p className={` ${styles.item__created} text text_type_main-default`}>Cоздан</p>
          )}
          <p className={` ${styles.order_modal_stuff} text text_type_main-medium mb-6`}>Состав:</p>
          <div className={` ${styles.order_modal_container} custom-scroll`}>
            {Array.from(uniqueIngredients).map((ingredientId, index) => {
              const ingredientInfo = ingredients.find((ing) => ing._id === ingredientId);
              const ingredientQuantity = ingredientInfo?.type === 'bun' ? 2 : 1;

              if (ingredientInfo) {
                return (
                  <div className={styles.order_modal_item} key={index}>
                    <div className={styles.order_modal_ing}>
                      <img className={styles.order_modal_ingpic} alt={ingredientInfo.name} src={ingredientInfo.image} />
                      <p className={` ${styles.order_modal_ingname} text text_type_main-default`}>{ingredientInfo.name}</p>
                    </div>
                    <div className={styles.order_modal_price}>
                      <p className='text text_type_digits-default mr-2'>{ingredientQuantity} x {ingredientInfo.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className={styles.modal_extrainfo}>
            {order.updatedAt && (
              <FormattedDate
                date={new Date(order.updatedAt)}
                className="text text_type_main-default text_color_inactive"
              />
            )}
            <div className={styles.order_modal_price}>
              <p className='text text_type_digits-default mr-2'>{totalOrderPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      ) : (
        <p>Заказ не найден</p>
      )}
    </div>
  );
};


export default OrderModal;