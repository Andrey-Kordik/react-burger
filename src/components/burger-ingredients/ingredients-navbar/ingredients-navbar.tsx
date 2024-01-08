import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients-navbar.module.css';
import { useState, useEffect } from 'react';

interface IngredientsNavbarProps {
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
  ingredientsContainerRef: React.RefObject<HTMLDivElement>;
}

const IngredientsNavbar: FC<IngredientsNavbarProps> = ({ current, setCurrent, ingredientsContainerRef }) => {

  const [currentHeader, setCurrentHeader] = useState<string>(current);
  const headers: string[] = ['bun', 'sauce', 'main'];

  useEffect(() => {
    const handleScroll = () => {
      const container = ingredientsContainerRef.current;
      const { top: containerTop, bottom: containerBottom } = container
        ? container.getBoundingClientRect()
        : { top: 0, bottom: 0 };

      let closestHeader;
      let closestHeaderDistance = Number.POSITIVE_INFINITY;

      headers.forEach((header) => {
        const element = document.getElementById(header);
        const { top: elementTop, bottom: elementBottom } = element
          ? element.getBoundingClientRect()
          : { top: 0, bottom: 0 };

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

    if (ingredientsContainer) {
      ingredientsContainer.addEventListener('scroll', handleScroll);

      return () => {
        ingredientsContainer.removeEventListener('scroll', handleScroll);
      };
    }

    return () => { };
  }, [headers, ingredientsContainerRef]);

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


export default IngredientsNavbar;