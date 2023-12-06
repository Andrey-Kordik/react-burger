import React from 'react';
import styles from './app.module.css';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { burgersData } from '../utils/data';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerIngredients
          burgers={burgersData} />
        <BurgerConstructor burgers={burgersData}
        />

      </main>
    </div>
  );
}

export default App;
