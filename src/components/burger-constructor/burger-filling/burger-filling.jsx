import React, { useRef } from 'react';
import styles from "./burger-filling.module.css";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { reorderIngredients } from "../../../services/constructor-ingredients/actions";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../../utils/prop-types';

const Filling = ({ ingredient, deleteIng, index }) => {

  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item:  {index} ,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ingredient',
    hover(item, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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
        <DragIcon />
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

Filling.propTypes = {
  ingredient: burgerPropTypes.isRequired,
  deleteIng: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default Filling;
