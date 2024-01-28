import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REORDER_INGREDIENTS,
  SET_TOTAL_PRICE
} from "./actions";

import { IIngredient } from '../types/types';
import type { TIngredientsActions } from "./actions";

export type TConstructorState = {
  burgerConstructor: {
    bun: null | IIngredient,
    ingredients: IIngredient[],
  },
  totalPrice: number,
};


const initialState = {
  burgerConstructor: {
    bun: null ,
    ingredients: [],
  },
  totalPrice: 0,
};

export const reducer = (state: TConstructorState = initialState, action: TIngredientsActions): TConstructorState => {
  switch (action.type) {

    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          burgerConstructor: {
            ...state.burgerConstructor,
            bun: action.payload,
          },
        };
      } else {
        return {
          ...state,
          burgerConstructor: {
            ...state.burgerConstructor,
            ingredients: [...state.burgerConstructor.ingredients, { ...action.payload, _id: action.id }],
          },
        };
      }
    }
    case REMOVE_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          burgerConstructor: {
            ...state.burgerConstructor,
            bun: null,
          },
        };
      } else {
        return {
          ...state,
          burgerConstructor: {
            ...state.burgerConstructor,
            ingredients: state.burgerConstructor.ingredients.filter((ingredient) => ingredient !== action.payload),
          },
        };
      }
    }
    case SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };
    case REORDER_INGREDIENTS: {
      const { fromIndex, toIndex } = action.payload;
      const updatedIngredients = [...state.burgerConstructor.ingredients];

      updatedIngredients.splice(toIndex, 0, updatedIngredients.splice(fromIndex, 1)[0]);

      return {
        ...state,
        burgerConstructor: {
          ...state.burgerConstructor,
          ingredients: updatedIngredients,
        },
      };
    }
    default:
      return state;
  }
};
