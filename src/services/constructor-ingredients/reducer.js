import {
  SET_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REORDER_INGREDIENTS,
  SET_TOTAL_PRICE
} from "./actions";

const initialState = {
  selectedIngredient: null,
  burgerConstructor: [],
  totalPrice: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: action.payload,
      };
    case CLEAR_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: null,
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice + action.payload.price,
        burgerConstructor: [...state.burgerConstructor, { ...action.payload, id: action.id }],
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice - action.payload.price,
        burgerConstructor: state.burgerConstructor.filter(
          (ingredient) => ingredient !== action.payload
        ),
      };

    case SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };

    case REORDER_INGREDIENTS:
      const { fromIndex, toIndex } = action.payload;
      const updatedConstructor = [...state.burgerConstructor];

      updatedConstructor.splice(toIndex, 0, updatedConstructor.splice(fromIndex, 1)[0]);

      return {
        ...state,
        burgerConstructor: updatedConstructor,
      };
    default:
      return state;
  }
};
