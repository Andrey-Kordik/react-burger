import React from 'react';

import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorPriceBar from './burger-constructor-pricebar/burger-constructor-pricebar';
import { useDrop, useDrag } from "react-dnd";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, removeIngredient, updateConstructor, setTotalPrice } from '../../services/selected-ingredients/actions'
import { v4 as uuidv4 } from 'uuid';


function BurgerConstructor({ onOpenWindow, isModalOpen, onCloseModal }) {
  const dispatch = useDispatch();
  const builder = useSelector((state) => state.selectedIngredients.burgerConstructor);
  const totalPrice = useSelector((state) => state.selectedIngredients.totalPrice);

  const [, dropTarget] = useDrop({
    accept: ["ingredient", "bun"],
    drop: (item) => onDropHandler(item),
  });

  const [, drag] = useDrag({
    type: 'ingredient',
  });

  const deleteIng = (item) => {
    dispatch(removeIngredient(item));
    calculateTotalPrice();
  };

  const calculateTotalPrice = () => {
    let bunCount = 0;
    let totalPrice = 0;

    builder.forEach((ingredient) => {
      if (ingredient.type === "bun") {
        bunCount++;
        totalPrice += ingredient.price;
      } else {
        totalPrice += ingredient.price;
      }
    });

    if (bunCount >= 1) {
      totalPrice += builder.find((ingredient) => ingredient.type === "bun").price;
    }

    dispatch(setTotalPrice(totalPrice));
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [builder]);


  const onDropHandler = (item) => {
    if (item.length > 0 && item[0].type === "bun") {
      const existingBun = builder.find((ingredient) => ingredient.type === "bun");
      if (existingBun) {
        dispatch(removeIngredient(existingBun));
      }
      const newItem = { ...item[0], _id: uuidv4() };
      dispatch(addIngredient(newItem));
    } else if (item.length > 0) {
      const newItem = { ...item[0], _id: uuidv4() };
      dispatch(addIngredient(newItem));
    }
  };

  const hasBuns = builder.filter((ingredient) => ingredient.type === "bun");
  const hasFillings = builder.filter((ingredient) => ingredient.type === "sauce" || ingredient.type === "main");

  return (
    <section className={`${styles.burgers_constructor} pt-25`}>
      <div className={`${styles.burger_construct_list} mr-2`} ref={dropTarget}>
        {hasBuns.length > 0 && hasFillings.length > 0 && builder.length > 0 ? (
          <div className={styles.burger_construct_list_item}>
            <div className={styles.no_icon}></div>
            {hasBuns.map((ingredient) => (
              <ConstructorElement
                key={ingredient._id}
                text={`${ingredient.name} (верх)`}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                isLocked={true}
                type="top"
              />
            ))}
            <div className={` ${styles.burger_constructor_ing} custom-scroll`} >
              {hasFillings.map((ingredient) => (
                <div className={styles.burger_constructor_ing_icon} key={ingredient._id} >
                  <DragIcon />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    key={ingredient._id}
                    thumbnail={ingredient.image_mobile}
                    handleClose={() => deleteIng(ingredient)}

                  />
                </div>
              ))}
            </div>
            {hasBuns.map((ingredient) => (
              <ConstructorElement
                key={ingredient._id}
                text={`${ingredient.name} (низ)`}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                isLocked={true}
                type="bottom"
              />
            ))}
            <div className={styles.no_icon}></div>
          </div>
        ) : (
          <>
            {!hasBuns.length > 0 && hasFillings.length > 0 && (
              <>
                <div className={styles.burger_construct_container}>Выберите булку</div>
                <div className={` ${styles.burger_constructor_ing} custom-scroll`} >
                  {hasFillings.map((ingredient) => (
                    <div className={styles.burger_constructor_ing_icon} key={ingredient._id}>
                      <DragIcon />
                      <ConstructorElement
                        text={ingredient.name}
                        key={ingredient._id}
                        price={ingredient.price}
                        thumbnail={ingredient.image_mobile}
                        handleClose={() => deleteIng(ingredient)}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.burger_construct_container}>Выберите булку</div>
              </>
            )}

            {hasBuns.length > 0 && !hasFillings.length > 0 && (
              <>
                {hasBuns.map((ingredient) => (
                  <ConstructorElement
                    key={ingredient._id}
                    text={`${ingredient.name} (верх)`}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                    isLocked={true}
                    type="top"
                  />
                ))}
                <div className={styles.burger_construct_container}>Выберите начинку</div>
                {hasBuns.map((ingredient) => (
                  <ConstructorElement
                    key={ingredient._id}
                    text={`${ingredient.name} (низ)`}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                    isLocked={true}
                    type="bottom"
                  />
                ))}
              </>
            )}

            {!hasBuns.length > 0 && !hasFillings.length > 0 && (
              <>
                <div className={styles.burger_construct_container}>Выберете булку</div>
                <div className={styles.burger_construct_container}>Выберете начинку</div>
                <div className={styles.burger_construct_container}>Выберете булку</div>
              </>
            )}
          </>
        )}
      </div>

      <BurgerConstructorPriceBar
        onOpenWindow={onOpenWindow}
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
        totalPrice={totalPrice}
        ings ={builder}

      />
    </section>
  );
}

BurgerConstructor.propTypes = {
  onOpenWindow: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;

