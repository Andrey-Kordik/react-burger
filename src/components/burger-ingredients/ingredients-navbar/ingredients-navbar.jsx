import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients-navbar.module.css';


function IngredientsNavbar() {
  const [current, setCurrent] = React.useState('bun')

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    </nav>
  );
}

export default IngredientsNavbar