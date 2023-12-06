import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


function Header() {

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <nav className={styles.header__nav}>
          <div className={`${styles.header__nav_container} mr-12`}>
            <BurgerIcon />
            <p className="text text_type_main-default pl-2">Конструктор</p>
          </div>
          <div className={styles.header__nav_container}>
            <MenuIcon
              type="secondary" />
            <a href="/" className={` ${styles.header__links} text text_type_main-default text_color_inactive pl-2`}>Лента заказов</a>
          </div>
        </nav>
        <Logo />
        <div className={styles.header__profile}>
          <ProfileIcon
            type="secondary" />
          <a href="/" className={` ${styles.header__links} text text_type_main-default text_color_inactive pl-2`}>Личный кабинет</a>
        </div>
      </div>
    </header>
  );
}

export default Header