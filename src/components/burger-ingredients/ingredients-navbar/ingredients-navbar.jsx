import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients-navbar.module.css';
import {  useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function IngredientsNavbar({current, setCurrent, ingredientsContainerRef}) {
  const [currentHeader, setCurrentHeader] = useState(current);

  const headers = ['bun', 'sauce', 'main'];

  useEffect(() => {
    const handleScroll = () => {
      const container = ingredientsContainerRef.current;
      const { top: containerTop, bottom: containerBottom } = container.getBoundingClientRect();

      let closestHeader;
      let closestHeaderDistance = Number.POSITIVE_INFINITY;

      headers.forEach((header) => {
        const element = document.getElementById(header);
        const { top: elementTop, bottom: elementBottom } = element.getBoundingClientRect();

        const distance = Math.min(
          Math.abs(elementTop - containerTop),
          Math.abs(elementBottom - containerBottom)
        );

        if (distance < closestHeaderDistance) {
          closestHeader = header;
          closestHeaderDistance = distance;
        }
      });

      if (closestHeader) {
        setCurrentHeader(closestHeader);
      }
    };

    const ingredientsContainer = ingredientsContainerRef.current;

    ingredientsContainer.addEventListener('scroll', handleScroll);

    return () => {
      ingredientsContainer.removeEventListener('scroll', handleScroll);
    };
  }, [headers, ingredientsContainerRef]);

  // Обновите current и setCurrent при изменении пропса current в компоненте
  useEffect(() => {
    setCurrentHeader(current);
  }, [current]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container} ref={ingredientsContainerRef}>
        <Tab value="bun" active={currentHeader === 'bun'} onClick={() => setCurrent('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentHeader === 'sauce'} onClick={() => setCurrent('sauce')}>
          Соусы
        </Tab>
        <Tab value="main" active={currentHeader === 'main'} onClick={() => setCurrent('main')}>
          Начинки
        </Tab>
      </div>
    </nav>
  );
}


IngredientsNavbar.propTypes = {
  current: PropTypes.string.isRequired,
  setcurrent: PropTypes.func,
  ingredientsContainerRef: PropTypes.object.isRequired
};


export default IngredientsNavbar;