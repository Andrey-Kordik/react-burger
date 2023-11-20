
import styles from './ingredient-details.module.css'


const IngredientDetails = ({ingredient}) => {
  return (
    <div className={styles.ingredient_details}>
<img src={ingredient.image_large}></img>
<p className='text text_type_main-medium'>{ingredient.image_name}</p>
<div className={styles.ingredient_details_components}>
  <p className='text text_type_main-default text_color_inactive'>Калории,ккал + {ingredient.calories}</p>
  <p className='text text_type_main-default text_color_inactive'>Белки, г + {ingredient.proteins}</p>
  <p className='text text_type_main-default text_color_inactive'>Жиры, г + {ingredient.fat}</p>
  <p className='text text_type_main-default text_color_inactive'>Углеводы, г, {ingredient.carbohydrates}</p>
</div>
    </div>
  )
};

export default IngredientDetails
