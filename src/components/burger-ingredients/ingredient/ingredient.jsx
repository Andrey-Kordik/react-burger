import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css';
import PropTypes from 'prop-types';

function Ingredient({ data }) {
  return (
    <article className={styles.ingredient}>
      <img src={data.image} alt={data.name} />
      <div className={styles.ingredient__price}>
        <p className="text text_type_digits-default pr-1">{data.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
    </article>
  );
}

Ingredient.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};


export default Ingredient;