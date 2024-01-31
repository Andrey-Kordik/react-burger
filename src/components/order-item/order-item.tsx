import React, { FC, useEffect, useRef } from 'react';
import styles from './order-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link } from 'react-router-dom';
import { Order } from '../../services/types/types';
import { useSelector } from '../../services/hooks/hooks';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

export interface OrderProps {
  order: Order;
}

const MAX_INGREDIENTS_DISPLAYED = 6;

const OrderItem: FC<OrderProps> = ({ order }) => {
  const location = useLocation();

  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const itemContainerRef = useRef<HTMLDivElement>(null);
  const maxWidth = location.pathname.includes('/feed') ? '580px' : '840px';
  const itemContainerWidth = location.pathname.includes('/feed') ? '536px' : '800px';

  const getIngredientInfo = (ingredientId: string): { image?: string, price?: number, name?: string, type?: string } => {
    const ingredient = ingredients.find((ing) => ing._id === ingredientId);
    return ingredient || {};
  };

  const orderNumber = order.number;

  const calculateTotalPrice = (): number => {
    let totalPrice = 0;
    const bunMultiplier = 2;

    const ingredientCount: Record<string, number> = {};

    order.ingredients.forEach((ingredientId) => {
      if (ingredientCount[ingredientId]) {
        ingredientCount[ingredientId]++;
      } else {
        ingredientCount[ingredientId] = 1;
      }
    });

    Object.keys(ingredientCount).forEach((ingredientId) => {
      const ingredientInfo = getIngredientInfo(ingredientId);
      const ingredientQuantity = ingredientInfo.type === 'bun' ? bunMultiplier : ingredientCount[ingredientId];
      totalPrice += (ingredientInfo.price || 0) * ingredientQuantity;
    });

    return totalPrice;
  };

  useEffect(() => {
    const container = itemContainerRef.current;
    if (container) {
      const items = container.querySelectorAll(`.${styles.item_stuff_item}`);

      items.forEach((item, index) => {
        const element = item as HTMLElement;
        element.style.left = `${index * -10}px`;
        element.style.zIndex = `${items.length - index}`;
      });
    }
  }, []);

  const totalOrderPrice = calculateTotalPrice();
  const remainingIngredients = Array.from(new Set(order.ingredients)).slice(MAX_INGREDIENTS_DISPLAYED);
  const shouldDisplayOverlay = remainingIngredients.length > 0;


  const getOrderPath = (): string => {
    if (location.pathname.includes('/feed')) {
      return `/feed/${orderNumber}`;
    } else if (location.pathname.includes('/profile/orders')) {
      return `/profile/orders/${orderNumber}`;
    }
    return `/feed/${orderNumber}`;
  }

  return (
    <Link
      key={orderNumber} to={getOrderPath()} state={{ background: location }} className={styles.link}>
      <div className={styles.item} ref={itemContainerRef} style={{ maxWidth }}>
        <div className={styles.item_container} style={{ width: itemContainerWidth }}>
          <div className={`${styles.item_info} mt-6 mb-6`}>
            <p className='text text_type_digits-default'>#{order.number}</p>
            <FormattedDate date={new Date(order.createdAt)} className="text text_type_main-default text_color_inactive" />
          </div>
          {location.pathname.includes('/feed') ? (
            <p className={`${styles.item_heading} text text_type_main-medium mb-6`}>
              {order.name}
            </p>
          ) : (
            <div className={` ${styles.item_text} mb-6`}>
              <p className={`${styles.item_heading} text text_type_main-medium mb-2`}>
                {order.name}
              </p>
              {order.status === 'done' && (
                <p className={` ${styles.item__done} text text_type_main-default`}>Выполнен</p>
              )}
              {order.status === 'pending' && (
                <p className={` ${styles.item__preparing} text text_type_main-default`}>Готовится</p>
              )}
              {order.status === 'created' && (
                <p className={` ${styles.item__preparing} text text_type_main-default`}>Cоздан</p>
              )}
            </div>

          )}
          <div className={`${styles.item_stuff_data} mb-6`}>
            <div className={styles.item_stuff}>
              {Array.from(new Set(order.ingredients)).slice(0, MAX_INGREDIENTS_DISPLAYED).map((ingredientId, index) => {
                const ingredientInfo = getIngredientInfo(ingredientId);

                return (
                  <img
                    key={index}
                    className={styles.item_stuff_item}
                    alt={ingredientInfo.name}
                    src={ingredientInfo.image}
                  />
                );
              })}

              {shouldDisplayOverlay && (
                <div className={styles.overlay}>
                  <p>+{remainingIngredients.length}</p>
                </div>
              )}
            </div>
            <div className={styles.item_price}>
              <p className='text text_type_digits-default'>{totalOrderPrice}</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;