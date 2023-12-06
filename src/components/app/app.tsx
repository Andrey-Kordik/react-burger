import React from 'react';
import styles from './app.module.css';
import { useState, useEffect } from 'react';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ingredientsApi } from '../utils/ingredients-api';


function App() {
  const [ingredients, setIngredients] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    ingredientsApi.getIngredients()
      .then((data) => {
        setIngredients(data.data)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerIngredients
          burgers={ingredients}
          onCloseModal={closeModal} />
        <BurgerConstructor

          onOpenWindow={handleOrderClick}
          isModalOpen={isModalOpen}
          onCloseModal={closeModal}
        />
      </main>
    </div>
  );
}

export default App;
