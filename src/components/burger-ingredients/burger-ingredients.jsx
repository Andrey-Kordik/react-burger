import React from 'react';
import styles from './burger-ingredients.module.css';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import IngredientsNavbar from './ingredients-navbar/ingredients-navbar';
import Ingredient from './ingredient/ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modals/modal/modal';
import { burgerPropTypes } from '../utils/prop-types'


function BurgerIngredients({ burgers, onCloseModal }) {

  const [isIngredientModalOpen, setisIngredientModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    setisIngredientModalOpen(true)
  };

  const filteredBurgers = useMemo(() => {
    const buns = burgers.filter((item) => item.type === 'bun');
    const sauces = burgers.filter((item) => item.type === 'sauce');
    const mains = burgers.filter((item) => item.type === 'main');

    return { buns, sauces, mains };
  }, [burgers]);

  const handleIngredientModalClose = () => {
    setSelectedIngredient(null);
    onCloseModal();
  };

  return (
    <section className={styles.ingredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <IngredientsNavbar />
      <div className={`${styles.ingredients_list} custom-scroll pr-2`}>
        <div className={styles.ingredients_buns}>
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <div className={styles.ingredients_container}>
            {filteredBurgers.buns.map((bun) => (
              <div key={bun._id} onClick={() => handleIngredientClick(bun)}>
                <Ingredient data={bun} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ingredients_sauces}>
          <h2 className="text text_type_main-medium mb-6">Соусы</h2>
          <div className={styles.ingredients_container}>
            {filteredBurgers.sauces.map((sauce) => (
              <div key={sauce._id} onClick={() => handleIngredientClick(sauce)}>
                <Ingredient data={sauce} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ingredients_mains}>
          <h2 className="text text_type_main-medium mb-6">Начинки</h2>
          <div className={styles.ingredients_container}>
            {filteredBurgers.mains.map((main) => (
              <div key={main._id} onClick={() => handleIngredientClick(main)}>
                <Ingredient data={main} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isIngredientModalOpen && selectedIngredient && (

        <Modal onClose={handleIngredientModalClose}
          headerHeading="Детали ингридиента">
          <IngredientDetails ingredient={selectedIngredient}
          />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  burgers: PropTypes.arrayOf(burgerPropTypes).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;

