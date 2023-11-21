import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients-navbar.module.css';


function IngredientsNavbar() {
  const [current, setCurrent] = React.useState('one')

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    </nav>
  );
}

export default IngredientsNavbar