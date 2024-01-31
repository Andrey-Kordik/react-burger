import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom';
import {
  allOrdersConnect,
  allOrdersDisconnect,
} from "../../services/ws-all-orders/actions";

interface HeaderUserName {
  userName: string;
}

const Header: FC<HeaderUserName> = ({ userName }) => {

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <nav className={styles.header__nav}>
          <div className={`${styles.header__nav_container} mr-12`}>
            <BurgerIcon type={window.location.pathname === '/' ? "primary" : "secondary"} />
            <NavLink
              to='/'
              className={`${window.location.pathname === '/' ? styles.header__links : styles.header__links_inactive} pl-2`}>
              Конструктор
            </NavLink>
          </div>
          <div className={styles.header__nav_container}>
            <MenuIcon
              type="secondary" />
            <NavLink
              to='/feed'
              className={`${window.location.pathname === '/feed' ? styles.header__links : styles.header__links_inactive} pl-2`}>
              Лента заказов
            </NavLink>
          </div>
        </nav>
        <div className={styles.header_logo_container}>
          <NavLink to='/'><Logo /></NavLink>
        </div>
        <div className={styles.header__profile}>
          {userName ? (
            <NavLink to="/profile" className={`${window.location.pathname === '/profile' ? styles.header__links : styles.header__links_inactive} pl-2`}>
              {userName}
            </NavLink>
          ) : (
            <>
              <ProfileIcon type={window.location.pathname === '/profile' ? "primary" : "secondary"} />
              <NavLink to="/profile" className={`${window.location.pathname === '/profile' ? styles.header__links : styles.header__links_inactive} pl-2`}>
                Личный кабинет
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header