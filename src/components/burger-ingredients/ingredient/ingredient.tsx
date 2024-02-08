import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css';
import { useDrag } from "react-dnd";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from "../../../services/hooks/hooks";
import { Link, useLocation } from 'react-router-dom';
import { IIngredient } from '../../../services/types/types'

interface IngredientProps {
  data: IIngredient;
}

const Ingredient: FC<IngredientProps> = ({ data }) => {

  const location = useLocation();
  const ing = data;
  const ingredientId = data['_id'];
  const constructorIngredients = useSelector((state) => state.selectedIngredients.burgerConstructor);
  const isBunInConstructor = constructorIngredients.bun && constructorIngredients.bun._id === ing._id;

  const count = isBunInConstructor
    ? 2
    : constructorIngredients.ingredients.filter((ingredient) => ingredient._id === ing._id).length;

  const [, dragRef] = useDrag({
    type: data.type === "bun" ? "bun" : "ingredient",
    item: [ing],
  });
  return (
    <Link
      key={ingredientId} to={`/ingredients/${ingredientId}`} state={{ background: location }} className={styles.link}>
      <article className={styles.ingredient} ref={dragRef}>
        {count > 0 && <Counter count={count} />}
        <img src={data.image} alt={data.name} />
        <div className={styles.ingredient__price}>
          <p className="text text_type_digits-default pr-1">{data.price}</p>
          <CurrencyIcon type='primary'/>
        </div>
        <p className="text text_type_main-default">{data.name}</p>
      </article>
    </Link>
  );
}


export default Ingredient;
