import styles from './ingredient-details.module.css'
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../utils/prop-types';


const IngredientDetails = ({ ingredient }) => {

  return (
    <div className={styles.ingredient_details}>
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

IngredientDetails.propTypes = {
  ingredient: burgerPropTypes.isRequired,
};

export default IngredientDetails
