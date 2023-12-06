import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients-navbar.module.css';

function IngredientsNavbar() {

  return (
    <nav className={styles.navbar}>
      <Tab>Булки</Tab>
      <Tab>Соусы</Tab>
      <Tab>Начинки</Tab>
    </nav>
  );
}

export default IngredientsNavbar