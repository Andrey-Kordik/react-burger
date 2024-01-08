import styles from './ingredient-details.module.css';
<<<<<<< HEAD:src/components/ingredient-details/ingredient-details.tsx
import React, { FC } from 'react';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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
}

  const IngredientDetails: FC <IngredientDetailsProps> = ({ background }) => {

  const { ingredientId } = useParams();

  //@ts-ignore
  const initialIngredients = useSelector((store) => store.ingredients);
  const allIngredients = initialIngredients.ingredients.data

  const ingredient = allIngredients.find((ingredient: ModalIngredient) => ingredient._id === ingredientId);
=======
import PropTypes from 'prop-types';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const IngredientDetails = ({background}) => {
  const { ingredientId } = useParams();

  const initialIngredients = useSelector((store) => store.ingredients);
  const allIngredients = initialIngredients.ingredients.data
>>>>>>> main:src/components/ingredient-details/ingredient-details.jsx

  const ingredient = allIngredients.find((ingredient) => ingredient._id === ingredientId);
  return (
    <div className={styles.ingredient_details}>
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

<<<<<<< HEAD:src/components/ingredient-details/ingredient-details.tsx
=======
IngredientDetails.propTypes = {
  background: PropTypes.object,
};

>>>>>>> main:src/components/ingredient-details/ingredient-details.jsx
export default IngredientDetails
