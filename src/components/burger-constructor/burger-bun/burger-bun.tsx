
import React, { FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
<<<<<<< HEAD:src/components/burger-constructor/burger-bun/burger-bun.tsx
import { IIngredient } from '../../app/app';
=======
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../../../utils/prop-types';
>>>>>>> main:src/components/burger-constructor/burger-bun/burger-bun.jsx

interface BunProps {
  ingredient: IIngredient;
  text: string;
  type?: 'top' | 'bottom';
}

const Bun: FC<BunProps> = ({ ingredient, text, type }) => {
  return (

    <div key={ingredient.key}>
      <ConstructorElement
        text={text}
        type={type}
        price={ingredient.price}
        key={ingredient.key}
        thumbnail={ingredient.image_mobile}
        isLocked={true}
      />
    </div>
  );
};


export default Bun;