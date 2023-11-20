import React from 'react';
import { useState, useEffect } from 'react';
import IngredientsNavbar from './ingredients-navbar/ingredients-navbar';
import styles from './burger-ingredients.module.css';
import Ingredient from './ingredient/ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modals/modal/modal';

function BurgerIngredients({ burgers, onOpenWindow, isModalOpen, onCloseModal }) {

  console.log(isModalOpen);

  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    onOpenWindow(ingredient.type)
  };

  const buns = burgers.filter((item) => item.type === 'bun');
  const sauces = burgers.filter((item) => item.type === 'sauce');
  const mains = burgers.filter((item) => item.type === 'main');

  const handleModalClose = () => {
    setSelectedIngredient(null);
    onCloseModal();
  };


  return (
    <section className={styles.ingredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <IngredientsNavbar />
      <div className={`${styles.ingredients_list} custom-scroll`}>
        <div className={styles.ingredients_buns}>
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <div className={styles.ingredients_container}>
          {buns.map((bun) => (
              <div key={bun._id} onClick={() => handleIngredientClick(bun)}>
                <Ingredient data={bun} />
              </div>
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
      {isModalOpen &&  selectedIngredient && (
        <Modal onClose={handleModalClose}>
          <IngredientDetails ingredient={selectedIngredient}
          />
        </Modal>
      )}

    </section>
  );
}

export default BurgerIngredients;

