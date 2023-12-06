import {
  ORDER_LOAD_SUCCESS,
  ORDER_LOADING,
  ORDER_ERROR,
} from "./actions";

const initialState = {
  orderNumber: null,
  loading: false,
  error: null
};

export const reducer = (state = initialState, action) => {
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
        orderNumber: action.payload.orderNumber,
        loading: false,
      };


    default:
      return state;
  }
};