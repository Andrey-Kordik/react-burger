import React from 'react';

import styles from './burger-constructor.module.css';
import BurgerConstructorPriceBar from './burger-constructor-pricebar/burger-constructor-pricebar';
import { useDrop } from "react-dnd";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { addIngredient, removeIngredient, setTotalPrice } from '../../services/constructor-ingredients/actions'
import { v4 as uuidv4 } from 'uuid';
import Filling from './burger-filling/burger-filling';
import Bun from './burger-bun/burger-bun';
import { IIngredient } from '../../services/types/types'

function BurgerConstructor() {
  const dispatch = useDispatch();
  const bun = useSelector((state) => state.selectedIngredients.burgerConstructor.bun);
  const ingredients = useSelector((state) => state.selectedIngredients.burgerConstructor.ingredients);
  const totalPrice = useSelector((state) => state.selectedIngredients.totalPrice);


  const onDropHandler = (item: IIngredient[]) => {
    if (item.length > 0 && item[0].type === 'bun') {
      if (bun !== null) {
        dispatch(removeIngredient(bun));
      }
      const newBun = { ...item[0] };
      dispatch(addIngredient(newBun));

    } else if (item.length > 0) {
      const newItem = { ...item[0], key: uuidv4() };
      dispatch(addIngredient(newItem));
    }
  };

  const [, dropTarget] = useDrop({
    accept: ['ingredient', 'bun'],
    drop: (item: IIngredient[]) => onDropHandler(item),
  });

  const hasBuns: boolean = bun !== null;
  const hasFillings: boolean = ingredients.length > 0;

  const deleteIng = (item: IIngredient) => {
    if (item.type === 'bun' && ingredients.length > 0) {
      const topBunIndex = ingredients.findIndex((ingredient: IIngredient) => ingredient.type === 'bun');
      if (topBunIndex !== -1) {
        dispatch(removeIngredient(ingredients[topBunIndex]));
      }
    } else {
      dispatch(removeIngredient(item));
    }
    calculateTotalPrice();
  };

  const calculateTotalPrice = () => {
    let bunCount = bun ? 1 : 0;
    let totalPrice = 0;
    ingredients.forEach((ingredient: IIngredient) => {
      totalPrice += ingredient.price;
    });

    if (bun) {
      totalPrice += bun.price * 2;
    }
    dispatch(setTotalPrice(totalPrice));
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [bun, ingredients]);

  return (
    <section className={`${styles.burgers_constructor} pt-25`}>
      <div className={`${styles.burger_construct_list} mr-2`} ref={dropTarget} data-testid="ing-constructor">
        {hasBuns && hasFillings && (
          <div className={styles.burger_construct_list_item} >
            <div className={styles.no_icon}></div>
            {hasBuns && (
              <>
                <Bun ingredient={bun} text={`${bun?.name} (верх)`} type="top" key={bun?.key} data-type="bun"/>
                <div className={` ${styles.burger_constructor_ing} custom-scroll`}>
                  {ingredients.map((ingredient: IIngredient, index: number) => (
                    <Filling ingredient={ingredient} deleteIng={deleteIng} key={ingredient.key} index={index} />
                  ))}
                </div>
                <Bun ingredient={bun} text={`${bun?.name} (низ)`} type="bottom" key={bun?.key} data-type="bun"/>
              </>
            )}
            <div className={styles.no_icon}></div>
          </div>
        )}

        {!hasBuns && hasFillings && (
          <>
            <div className={styles.burger_construct_container} data-testid="bun-constructor">Выберите булку</div>
            <div className={` ${styles.burger_constructor_ing} custom-scroll`}>
              {
                ingredients.map((ingredient: IIngredient, index: number) => (
                  <Filling ingredient={ingredient} deleteIng={deleteIng} key={ingredient.key} index={index} />
                ))}
            </div>
            <div className={styles.burger_construct_container} data-testid="bun-constructor">Выберите булку</div>
          </>
        )}

        {hasBuns && !hasFillings && (
          <>
            {hasBuns && (
              <>
                <Bun ingredient={bun} text={`${bun?.name} (верх)`} type="top" key={bun?.key} data-type="bun"/>
                <div className={styles.burger_construct_container}>Выберите начинку</div>
                <Bun ingredient={bun} text={`${bun?.name} (низ)`} type="bottom" key={bun?.key} data-type="bun"/>

              </>
            )}
          </>
        )}

        {!hasBuns && !hasFillings && (
          <>
            <div className={styles.burger_construct_container} data-testid="bun-constructor">Выберите булку</div>
            <div className={styles.burger_construct_container} >Выберите начинку</div>
            <div className={styles.burger_construct_container} >Выберите булку</div>
          </>
        )}
      </div>

      <BurgerConstructorPriceBar
        totalPrice={totalPrice}
        ings={ingredients}
        bun={bun}
      />
    </section>
  );
}

export default BurgerConstructor;

