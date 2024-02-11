import {
  INGREDIENTS_LOAD_SUCCESS,
  INGREDIENTS_LOADING,
  INGREDIENTS_ERROR,
} from "./actions";

import { IIngredient } from '../types/types';
import { TGetIngredientsActions } from "./actions";

export type TIngredientsState = {
  ingredients: IIngredient[],
  loading: boolean;
  error: null | string;
};

export const initialState = {
  ingredients: [],
  loading: false,
  error: null
};

export const reducer = (state:TIngredientsState = initialState, action:TGetIngredientsActions) : TIngredientsState  => {
  switch (action.type) {
    case INGREDIENTS_LOADING: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case INGREDIENTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case INGREDIENTS_LOAD_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        loading: false
      }

    default:
      return state;
  }
}