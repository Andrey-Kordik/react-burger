import {
  ORDER_LOAD_SUCCESS,
  ORDER_LOADING,
  ORDER_ERROR,
  CLEAR_ORDER_NUMBER
} from "./actions";

import { TOrderActions } from "./actions";

export type TOrderState = {
  orderNumber: null | number;
  loading: boolean;
  error: null | string;
};

export const initialState = {
  orderNumber: null,
  loading: false,
  error: null
};

export const reducer = (state: TOrderState  = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case ORDER_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ORDER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case ORDER_LOAD_SUCCESS:
      return {
        ...state,
        orderNumber: action.payload,
        loading: false,
      };

    case CLEAR_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: null,
      };

    default:
      return state;
  }
};