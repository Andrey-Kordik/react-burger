import {
  SET_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REORDER_INGREDIENTS,
  SET_TOTAL_PRICE
} from "./actions";

const initialState = {
  selectedIngredient: {},
  burgerConstructor: {
    bun: null,
    ingredients: [],
  },
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
            ingredients: [...state.burgerConstructor.ingredients, { ...action.payload, id: action.id }],
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
