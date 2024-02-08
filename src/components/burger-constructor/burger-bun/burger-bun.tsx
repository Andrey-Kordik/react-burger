
import React, { FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../../services/types/types';

interface BunProps {
  ingredient: IIngredient | null;
  text: string;
  type?: 'top' | 'bottom';
}

const Bun: FC<BunProps> = ({ ingredient, text, type }) => {

  if (!ingredient) {
    return null;
  }

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