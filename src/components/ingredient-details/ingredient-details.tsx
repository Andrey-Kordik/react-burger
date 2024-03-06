import styles from './ingredient-details.module.css';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IIngredient } from '../../services/types/types';

interface ModalIngredient {
  _id: string;
  image_large: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

interface IngredientDetailsProps {
  background: string | undefined;
  ingredients: IIngredient[]
}

  const IngredientDetails: FC <IngredientDetailsProps> = ({ background, ingredients }) => {

  const { ingredientId } = useParams();

  const ingredient = ingredients.find((ingredient: ModalIngredient) => ingredient._id === ingredientId);

  if (!ingredient) {
    return <p>Ингредиент не найден</p>;
  }

  return (
    <div className={styles.ingredient_details} data-testid='ingredient-details'>
       {!background && (
        <h1 className={styles.ingredient_details_heading}>Детали ингридиента</h1>
      )}
      <img src={ingredient.image_large}></img>
      <p className='text text_type_main-medium mt-4 mb-8'>{ingredient.name}</p>
      <div className={styles.ingredient_details_components}>
        <div className={styles.ingredient_details_components_item}>
          <div className='text text_type_main-default text_color_inactive'>Калории,ккал  <div>{ingredient.calories}</div></div>
        </div>
        <div className={styles.ingredient_details_components_item}>
          <div className='text text_type_main-default text_color_inactive'>Белки, г  <div>{ingredient.proteins}</div></div>
        </div>
        <div className={styles.ingredient_details_components_item}>
          <div className='text text_type_main-default text_color_inactive'>Жиры, г  <div>{ingredient.fat}</div></div>
        </div>
        <div className={styles.ingredient_details_components_item}>
          <div className='text text_type_main-default text_color_inactive'>Углеводы, г  <div>{ingredient.carbohydrates}</div></div>
        </div>
      </div>
    </div>
  )
};

export default IngredientDetails
