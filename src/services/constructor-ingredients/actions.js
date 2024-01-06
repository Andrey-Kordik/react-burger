
export const CLEAR_SELECTED_INGREDIENT = "CLEAR_SELECTED_INGREDIENT";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const REORDER_INGREDIENTS = "REORDER_INGREDIENTS";
export const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";


export const clearSelectedIngredient = () => ({
  type: 'CLEAR_SELECTED_INGREDIENT'
});

export const addIngredient = (ingredient, id) => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
  id:ingredient.id
});

export const removeIngredient = (ingredient) => ({
  type: REMOVE_INGREDIENT,
  payload: ingredient,
  id: ingredient.id,
});

export const reorderIngredients = (fromIndex, toIndex) => ({
  type: REORDER_INGREDIENTS,
  payload: { fromIndex, toIndex },
});

export const setTotalPrice = (totalPrice) => ({
  type: SET_TOTAL_PRICE,
  payload: totalPrice
})