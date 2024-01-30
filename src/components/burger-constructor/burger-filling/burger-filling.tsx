import React, { FC, useRef } from 'react';
import styles from "./burger-filling.module.css";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { reorderIngredients } from "../../../services/constructor-ingredients/actions";
import { useDispatch } from "../../../services/hooks/hooks";
import { IIngredient } from '../../../services/types/types';

interface FillingProps {
  ingredient: IIngredient;
  deleteIng: (ingredient: IIngredient) => void;
  index: number;
}

interface DraggedItem {
  index: number;
}

const Filling: FC<FillingProps> = ({ ingredient, deleteIng, index }) => {

  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'sorting',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'sorting',
    hover(item: DraggedItem, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = hoverBoundingRect ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2 : 0;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset ? clientOffset.y - (hoverBoundingRect?.top || 0) : 0;

      if (draggedIndex < targetIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (draggedIndex > targetIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(reorderIngredients(draggedIndex, targetIndex));
      item.index = targetIndex;
    },
  });

  drag(drop(ref));

  return (
    <div className={styles.burger_filling} key={ingredient.key} ref={ref}>
      <div className={styles.burger_filling_cont} style={{ opacity: isDragging ? 0.5 : 1 }}>
        < DragIcon type="primary"/>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          key={ingredient.key}
          thumbnail={ingredient.image_mobile}
          handleClose={() => deleteIng(ingredient)}
        />
      </div>
    </div>
  );
};


export default Filling;
