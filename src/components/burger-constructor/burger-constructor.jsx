import React from 'react';

import styles from './burger-constructor.module.css';
import BurgerConstructorPriceBar from './burger-constructor-pricebar/burger-constructor-pricebar';
import { useDrop } from "react-dnd";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, removeIngredient, reorderIngredients, setTotalPrice } from '../../services/constructor-ingredients/actions'
import { v4 as uuidv4 } from 'uuid';
import Filling from './burger-filling/burger-filling';
import Bun from './burger-bun/burger-bun';


function BurgerConstructor() {
  const dispatch = useDispatch();

  const totalPrice = useSelector((state) => state.selectedIngredients.totalPrice);

  const onDropHandler = (item) => {
    if (item.length > 0 && item[0].type === "bun") {
      const existingBun = builder.find((ingredient) => ingredient.type === "bun");
      if (existingBun) {
        dispatch(removeIngredient(existingBun));
      }
      const newItem = { ...item[0], key: uuidv4() };
      dispatch(addIngredient(newItem));
    } else if (item.length > 0) {
      const newItem = { ...item[0], key: uuidv4() };
      dispatch(addIngredient(newItem));
    }
  };

  const [, dropTarget] = useDrop({
    accept: ["ingredient", "bun"],
    drop: (item) => onDropHandler(item),
  });

  const builder = useSelector((state) => state.selectedIngredients.burgerConstructor);
  const hasBuns = builder.filter((ingredient) => ingredient.type === "bun");
  const hasFillings = builder.filter((ingredient) => ingredient.type === "sauce" || ingredient.type === "main");

  console.log(builder)

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


  return (
    <section className={`${styles.burgers_constructor} pt-25`}>
      <div className={`${styles.burger_construct_list} mr-2`} ref={dropTarget}>

        {hasBuns.length > 0 && hasFillings.length > 0 && (
          <div className={styles.burger_construct_list_item}>
            <div className={styles.no_icon}></div>
            {hasBuns.map((ingredient) => (
              <Bun ingredient={ingredient} text={`${ingredient.name} (верх)`} type="top" key={ingredient.key} />
            ))}
            <div className={` ${styles.burger_constructor_ing} custom-scroll`}  >
              {hasFillings.map((ingredient, index) => (
                <Filling ingredient={ingredient} deleteIng={deleteIng} key={ingredient.key} index={index} />
              ))}
            </div>
            {hasBuns.map((ingredient) => (
              <Bun ingredient={ingredient} text={`${ingredient.name} (низ)`} type="bottom" key={ingredient.key} />
            ))}
            <div className={styles.no_icon}></div>
          </div>
        )}

        {hasBuns.length === 0 && hasFillings.length > 0 && (
          <>
            <div className={styles.burger_construct_container}>Выберите булку</div>
            <div className={` ${styles.burger_constructor_ing} custom-scroll`} >
              {hasFillings.map((ingredient, index) => (
                <Filling ingredient={ingredient} deleteIng={deleteIng} key={ingredient.key} index={index} />
              ))}
            </div>
            <div className={styles.burger_construct_container}>Выберите булку</div>
          </>
        )}

        {hasBuns.length > 0 && !hasFillings.length > 0 && (
          <>
            {hasBuns.map((ingredient) => (
              <Bun ingredient={ingredient} text={`${ingredient.name} (верх)`} type="top" key={ingredient.key} />
            ))}
            <div className={styles.burger_construct_container}>Выберите начинку</div>
            {hasBuns.map((ingredient) => (
              <Bun ingredient={ingredient} text={`${ingredient.name} (низ)`} type="bottom" key={ingredient.key} />
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
      </div>

      <BurgerConstructorPriceBar
        totalPrice={totalPrice}
        ings={builder}
      />
    </section>
  );
}

export default BurgerConstructor;

