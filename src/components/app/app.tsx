import React from 'react';
import styles from './app.module.css';
import Header from '../app-header/app-header';
import { useState, useEffect } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { burgersData } from '../utils/data';
import { ingredientsApi } from '../utils/ingredients-api';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modals/modal/modal';


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
          onOpenWindow ={handleOrderClick}
          isModalOpen = {isModalOpen}
          onCloseModal = {closeModal} />
        <BurgerConstructor
        burgers={ingredients}
        onOpenWindow ={handleOrderClick}
        isModalOpen = {isModalOpen}
        onCloseModal = {closeModal}
        />
      </main>
    </div>
  );
}

export default App;
