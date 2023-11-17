import React from 'react';
import IngredientsNavbar from './ingredients-navbar/ingredients-navbar';
import styles from './burger-ingredients.module.css';
import Ingredient from './ingredient/ingredient';
import PropTypes from 'prop-types';



function BurgerIngredients({ burgers }) {

  const buns = burgers.filter((item) => item.type === 'bun');
  const sauces = burgers.filter((item) => item.type === 'sauce');
  const mains = burgers.filter((item) => item.type === 'main');

  return (
    <section className={styles.ingredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <IngredientsNavbar />
      <div className={`${styles.ingredients_list} custom-scroll`}>
        <div className={styles.ingredients_buns}>
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <div className={styles.ingredients_container}>
            {buns.map((bun) => (
              <Ingredient key={bun._id} data={bun} />
            ))}
          </div>
        </div>
        <div className={styles.ingredients_sauces}>
          <h2 className="text text_type_main-medium mb-6">Соусы</h2>
          <div className={styles.ingredients_container}>
            {sauces.map((sauce) => (
              <Ingredient key={sauce._id} data={sauce} />
            ))}
          </div>
        </div>
        <div className={styles.ingredients_mains}>
          <h2 className="text text_type_main-medium mb-6">Начинки</h2>
          <div className={styles.ingredients_container}>
            {mains.map((main) => (
              <Ingredient key={main._id} data={main} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  burgers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired,
};


export default BurgerIngredients;