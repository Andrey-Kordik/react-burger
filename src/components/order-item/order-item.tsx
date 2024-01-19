import React, { FC, useEffect } from 'react';
import styles from './order-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stuffPic from '../../images/sauce-03.png';
import { useLocation } from 'react-router-dom';

const OrderItem: FC = () => {
  const location = useLocation();

  const maxWidth = location.pathname.includes('/feed') ? '580px' : '840px';
  const itemContainerWidth = location.pathname.includes('/feed') ? '536px' : '800px';

  useEffect(() => {
    const maxItems = 6;
    const items = document.querySelectorAll(`.${styles.item_stuff_item}`);
    const remainingItems = Math.max(0, items.length - maxItems);

    items.forEach((item, index) => {
      const element = item as HTMLElement;
      element.style.left = `${index * -10}px`;
      element.style.zIndex = `${items.length - index}`;
    });

    if (remainingItems > 0) {
      const lastItem = items[maxItems - 1] as HTMLElement;
      const remainingItemsElement = document.createElement('div');
      remainingItemsElement.className = styles.remaining_items;
      remainingItemsElement.innerHTML = `+${remainingItems}`;
      lastItem.appendChild(remainingItemsElement);
    }
  }, []);

  return (
    <div className={styles.item} style={{ maxWidth }}>
      <div className={styles.item_container} style={{ width: itemContainerWidth }}>
        <div className={`${styles.item_info} mt-6 mb-6`}>
          <p className='text text_type_digits-default'>#034535</p>
          <p className='text text_type_main-default text_color_inactive'>Сегодня, 16:20</p>
        </div>
        {location.pathname.includes('/feed') ? (
          <p className={`${styles.item_heading} text text_type_main-medium mb-6`}>
            Death Star Starship Main бургер
          </p>
        ) : (
          <div className={` ${styles.item_text} mb-6`}>
            <p className={`${styles.item_heading} text text_type_main-medium mb-2`}>
              Death Star Starship Main бургер
            </p>
            <p className='text text_type_main-default'>Выполнен</p>
          </div>
        )}
        <div className={`${styles.item_stuff_data} mb-6`}>
          <div className={styles.item_stuff}>
            <img className={styles.item_stuff_item} alt='1' src={stuffPic}></img>
            <img className={styles.item_stuff_item} alt='2' src={stuffPic}></img>
            <img className={styles.item_stuff_item} alt='3' src={stuffPic}></img>
            <img className={styles.item_stuff_item} alt='4' src={stuffPic}></img>
            <img className={styles.item_stuff_item} alt='5' src={stuffPic}></img>
            <img className={styles.item_stuff_item} alt='6' src={stuffPic}></img>
          </div>
          <div className={styles.item_price}>
            <p className='text text_type_digits-default'>480</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;