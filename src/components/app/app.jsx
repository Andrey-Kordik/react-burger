import React from 'react';
import styles from './app.module.css';
import { useState, useEffect } from 'react';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {

  return (
    <div className={styles.app}>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients
           />
          <BurgerConstructor

          />
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
