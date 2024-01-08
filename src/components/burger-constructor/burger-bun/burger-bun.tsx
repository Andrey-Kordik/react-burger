
import React, { FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../app/app';

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