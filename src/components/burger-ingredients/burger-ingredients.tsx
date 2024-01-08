import React, { FC } from 'react';
import styles from './burger-ingredients.module.css';
import { useMemo, useState, useEffect,useRef } from 'react';
import IngredientsNavbar from './ingredients-navbar/ingredients-navbar';
import Ingredient from './ingredient/ingredient';
<<<<<<< HEAD:src/components/burger-ingredients/burger-ingredients.tsx
import {IIngredient } from '../app/app'

export interface IngredientsData extends Array<IIngredient> {}

interface BurgerIngredientsProps {
  ingredientsData: IngredientsData;
}

const BurgerIngredients: FC <BurgerIngredientsProps> = ({ ingredientsData }) => {

  const [current, setCurrent] = useState<string>('bun');
  const ingredientsContainerRef = useRef<HTMLDivElement>(null);

=======
import PropTypes from 'prop-types';

function BurgerIngredients({ingredientsData}) {

  const [current, setCurrent] = useState('bun');
  const ingredientsContainerRef = useRef();

>>>>>>> main:src/components/burger-ingredients/burger-ingredients.jsx
  const filteredBurgers = useMemo(() => {
    const buns = ingredientsData.filter((item) => item.type === 'bun');
    const sauces = ingredientsData.filter((item) => item.type === 'sauce');
    const mains = ingredientsData.filter((item) => item.type === 'main');

    return { buns, sauces, mains };
  }, [ingredientsData]);


  return (
    <section className={styles.ingredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <IngredientsNavbar current={current} setCurrent={setCurrent} ingredientsContainerRef={ingredientsContainerRef} />
      <div className={`${styles.ingredients_list} custom-scroll pr-2`} ref={ingredientsContainerRef}>
        <div className={styles.ingredients_buns} id="bun">
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <div className={styles.ingredients_container}>
            {filteredBurgers.buns.map((bun) => (
              <div key={bun._id}>
                <Ingredient data={bun} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ingredients_sauces} id="sauce">
          <h2 className="text text_type_main-medium mb-6">Соусы</h2>
          <div className={styles.ingredients_container}>
            {filteredBurgers.sauces.map((sauce) => (
              <div key={sauce._id} >
                <Ingredient data={sauce} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ingredients_mains} id="main">
          <h2 className="text text_type_main-medium mb-6">Начинки</h2>
          <div className={styles.ingredients_container}>
            {filteredBurgers.mains.map((main) => (
              <div key={main._id} >
                <Ingredient data={main} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

<<<<<<< HEAD:src/components/burger-ingredients/burger-ingredients.tsx
=======
BurgerIngredients.propTypes = {
  ingredientsData: PropTypes.array.isRequired,
};
>>>>>>> main:src/components/burger-ingredients/burger-ingredients.jsx

export default BurgerIngredients;

