import React from 'react';
import styles from './home.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropTypes from 'prop-types';

function HomePage({ingredientsData}) {

  return (
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients ingredientsData={ingredientsData}/>
          <BurgerConstructor/>
        </main>
      </DndProvider>
  );
}

HomePage.propTypes = {
  ingredientsData: PropTypes.array.isRequired
};

export default HomePage;
