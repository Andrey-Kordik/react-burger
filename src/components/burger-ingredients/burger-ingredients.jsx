import React from 'react';
import styles from './burger-ingredients.module.css';
import { useMemo, useState, useEffect,useRef } from 'react';
import IngredientsNavbar from './ingredients-navbar/ingredients-navbar';
import Ingredient from './ingredient/ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modals/modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedIngredient, clearSelectedIngredient } from "../../services/constructor-ingredients/actions"
import { loadIngredients } from '../../services/ingredients/actions'
import Preloader from '../Preloader/Preloader';

function BurgerIngredients() {
  const dispatch = useDispatch();
  const selectedIngredient = useSelector((state) => state.selectedIngredients.selectedIngredient);
  const [current, setCurrent] = useState('bun');
  const ingredientsContainerRef = useRef();

  const handleIngredientClick = (ingredient) => {
    dispatch(setSelectedIngredient(ingredient));
  };

  const { loading, error, ingredients } = useSelector((store) => store.ingredients);
  const ingredientsData = ingredients.data || [];

  const filteredBurgers = useMemo(() => {
    const buns = ingredientsData.filter((item) => item.type === 'bun');
    const sauces = ingredientsData.filter((item) => item.type === 'sauce');
    const mains = ingredientsData.filter((item) => item.type === 'main');

    return { buns, sauces, mains };
  }, [ingredientsData]);

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  if (loading) {
    return < Preloader />;
  }

  if (!loading && error) {
    return <h2>{`Ошибка: ${error}`}</h2>;
  }

  if (ingredients.length === 0) {
    return null;
  }

  const handleIngredientModalClose = () => {
    dispatch(clearSelectedIngredient());
  };

  return (
    <section className={styles.ingredients}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <IngredientsNavbar current={current} setCurrent={setCurrent} ingredientsContainerRef={ingredientsContainerRef} />
      <div className={`${styles.ingredients_list} custom-scroll pr-2`} ref={ingredientsContainerRef}>
        <div className={styles.ingredients_buns} id="bun">
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <div className={styles.ingredients_container}>
            {filteredBurgers.buns.map((bun) => (
              <div key={bun._id} onClick={() => handleIngredientClick(bun)}>
                <Ingredient data={bun} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ingredients_sauces} id="sauce">
          <h2 className="text text_type_main-medium mb-6">Соусы</h2>
          <div className={styles.ingredients_container}>
            {filteredBurgers.sauces.map((sauce) => (
              <div key={sauce._id} onClick={() => handleIngredientClick(sauce)}>
                <Ingredient data={sauce} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ingredients_mains} id="main">
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
      {selectedIngredient && (
        <Modal onClose={handleIngredientModalClose} headerHeading="Детали ингридиента">
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
}



export default BurgerIngredients;

