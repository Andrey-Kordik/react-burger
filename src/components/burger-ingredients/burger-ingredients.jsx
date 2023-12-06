import React from 'react';
import styles from './burger-ingredients.module.css';
import { useMemo, useState, useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import IngredientsNavbar from './ingredients-navbar/ingredients-navbar';
import Ingredient from './ingredient/ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modals/modal/modal';
import { burgerPropTypes } from '../utils/prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedIngredient, clearSelectedIngredient } from "../../services/selected-ingredients/actions"


function BurgerIngredients({ burgers, onCloseModal }) {

  const dispatch = useDispatch();
  const selectedIngredient = useSelector((state) => state.selectedIngredients.selectedIngredient);
  const ingredientsContainerRef = useRef()

  const handleIngredientClick = (ingredient) => {
    dispatch(setSelectedIngredient(ingredient));
  };

  const [currentHeader, setCurrentHeader] = useState('bun');

  const headers = ['bun', 'sauce', 'main'];

  useEffect(() => {

    const handleScroll = () => {
      const container = ingredientsContainerRef.current;
      const { top: containerTop, bottom: containerBottom } = container.getBoundingClientRect();

      let closestHeader;
      let closestHeaderDistance = Number.POSITIVE_INFINITY;

      headers.forEach((header) => {
        const element = document.getElementById(header);
        const { top: elementTop, bottom: elementBottom } = element.getBoundingClientRect();

        const distance = Math.min(
          Math.abs(elementTop - containerTop),
          Math.abs(elementBottom - containerBottom)
        );

        if (distance < closestHeaderDistance) {
          closestHeader = header;
          closestHeaderDistance = distance;
        }
      });

      if (closestHeader) {
        setCurrentHeader(closestHeader);
      }
    };

    const ingredientsContainer = ingredientsContainerRef.current;

    ingredientsContainer.addEventListener('scroll', handleScroll);

    return () => {
      ingredientsContainer.removeEventListener('scroll', handleScroll);
    };
  }, [headers]);

  const filteredBurgers = useMemo(() => {
    const buns = burgers.filter((item) => item.type === 'bun');
    const sauces = burgers.filter((item) => item.type === 'sauce');
    const mains = burgers.filter((item) => item.type === 'main');

    return { buns, sauces, mains };
  }, [burgers]);

  const handleIngredientModalClose = () => {
    dispatch(clearSelectedIngredient());
    onCloseModal();
  };

  return (
    <section className={styles.ingredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <IngredientsNavbar current={currentHeader} setCurrent={setCurrentHeader} />
      <div className={`${styles.ingredients_list} custom-scroll pr-2`} ref={ingredientsContainerRef}>
        <div className={styles.ingredients_buns} id="bun">
          <h2 className="text text_type_main-medium mb-6" >Булки</h2>
          <div className={styles.ingredients_container}>
            {filteredBurgers.buns.map((bun) => (
              <div key={bun._id} onClick={() => handleIngredientClick(bun)}>
                <Ingredient data={bun} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ingredients_sauces} id="sauce">
          <h2 className="text text_type_main-medium mb-6" >Соусы</h2>
          <div className={styles.ingredients_container}>
            {filteredBurgers.sauces.map((sauce) => (
              <div key={sauce._id} onClick={() => handleIngredientClick(sauce)}>
                <Ingredient data={sauce} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ingredients_mains} id="main">
          <h2 className="text text_type_main-medium mb-6" >Начинки</h2>
          <div className={styles.ingredients_container}>
            {filteredBurgers.mains.map((main) => (
              <div key={main._id} onClick={() => handleIngredientClick(main)}>
                <Ingredient data={main} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedIngredient && (
      <Modal onClose={handleIngredientModalClose} headerHeading="Детали ингридиента">
        <IngredientDetails ingredient={selectedIngredient} />
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

