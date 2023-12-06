import React from 'react';
import styles from './app.module.css';
import { useState, useEffect } from 'react';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from '../../services/ingredients/actions'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {

  const dispatch = useDispatch();

  const { loading, error, ingredients } = useSelector((store) => store.ingredients);

  const ingredientsData = ingredients.data

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  if (!loading && error) {
    return <h2>{`Ошибка: ${error}`}</h2>;
  }

  if (ingredients.length === 0) {
    return null;
  }

  return (
    <div className={styles.app}>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients
            burgers={ingredientsData}
            onCloseModal={closeModal} />
          <BurgerConstructor
            onOpenWindow={handleOrderClick}
            isModalOpen={isModalOpen}
            onCloseModal={closeModal}
          />
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
