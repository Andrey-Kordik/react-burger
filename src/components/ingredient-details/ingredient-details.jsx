import styles from './ingredient-details.module.css'


const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.ingredient_details}>
      <img src={ingredient.image_large}></img>
      <p className='text text_type_main-medium mt-4 mb-8'>{ingredient.name}</p>
      <div className={styles.ingredient_details_components}>
        <div className={styles.ingredient_details_components_item}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал  <div>{ingredient.calories}</div></p>
        </div>
        <div className={styles.ingredient_details_components_item}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г  <div>{ingredient.proteins}</div></p>
        </div>
        <div className={styles.ingredient_details_components_item}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г  <div>{ingredient.fat}</div></p>
        </div>
        <div className={styles.ingredient_details_components_item}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г  <div>{ingredient.carbohydrates}</div></p>
        </div>
      </div>
    </div>
  )
};

export default IngredientDetails
