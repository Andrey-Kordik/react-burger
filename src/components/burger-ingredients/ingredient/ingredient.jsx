import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { burgerPropTypes } from '../../utils/prop-types';
import styles from './ingredient.module.css';


function Ingredient({ data }) {

  return (
    <article className={styles.ingredient} >
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
  data: burgerPropTypes.isRequired,
};

export default Ingredient;