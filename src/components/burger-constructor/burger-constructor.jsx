import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorPriceBar from './burger-constructor-pricebar/burger-constructor-pricebar';
import PropTypes from 'prop-types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BurgerConstructor({ burgers }) {

  return (
    <section className={` ${styles.burgers_constructor} pt-25`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={`${styles.burger_construct_list} custom-scroll`}>
        <div className={styles.burger_construct_list_item}>
          <div className={styles.no_icon}></div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
          />
        </div>
        <div className={styles.burger_construct_list_item}>
          <DragIcon />
          <ConstructorElement
            type="sauce"
            isLocked={false}
            text="Соус традиционный галактический"
            price={30}
            thumbnail="https://code.s3.yandex.net/react/code/sauce-03-mobile.png"
          />
        </div>
        <div className={styles.burger_construct_list_item}>
          <DragIcon />
          <ConstructorElement
            type="main"
            isLocked={false}
            text="Мясо бессмертных моллюсков Protostomia"
            price={300}
            thumbnail="https://code.s3.yandex.net/react/code/meat-02-mobile.png"
          />
        </div>
        <div className={styles.burger_construct_list_item}>
          <DragIcon />
          <ConstructorElement
            type="main"
            isLocked={false}
            text="Плоды Фалленианского дерева"
            price={80}
            thumbnail="https://code.s3.yandex.net/react/code/sp_1-mobile.png"
          />
        </div>
        <div className={styles.burger_construct_list_item}>
          <DragIcon />
          <ConstructorElement
            type="main"
            isLocked={false}
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings-mobile.png"
          />
        </div>
        <div className={styles.burger_construct_list_item}>
          <DragIcon />
          <ConstructorElement
            type="main"
            isLocked={false}
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings-mobile.png"
          />
        </div>
        <div className={styles.burger_construct_list_item}>
          <div className={styles.no_icon}></div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
          />
        </div>
      </div>
      <BurgerConstructorPriceBar />
    </section>
  );
}

BurgerConstructor.propTypes = {
  burgers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['bun', 'sauce', 'main', 'top', 'bottom']).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image_mobile: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export default BurgerConstructor;