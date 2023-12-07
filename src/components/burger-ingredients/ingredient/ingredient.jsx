import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { burgerPropTypes } from '../../utils/prop-types';
import styles from './ingredient.module.css';
import { useDrag } from "react-dnd";
import { Counter  } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from "react-redux";


function Ingredient({ data }) {
  const ing = data;

  const constructorIngredients = useSelector((state) => state.selectedIngredients.burgerConstructor);

  let count = constructorIngredients.filter(
    (ingredient) => ingredient.name === data.name
  ).length;

  if (data.type === 'bun' && count > 0) {
    count = 2;
  }

  const [, dragRef] = useDrag({
    type: data.type === "bun" ? "bun" : "ingredient",
    item: [ ing ],
  });

  return (

    <article className={styles.ingredient} ref={dragRef}>
        {count > 0 && <Counter count={count} />}
      <img src={data.image} alt={data.name} />
      <div className={styles.ingredient__price}>
        <p className="text text_type_digits-default pr-1">{data.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
    </article>
  );
}

Ingredient.propTypes = {
  data: burgerPropTypes.isRequired,
};

export default Ingredient;
