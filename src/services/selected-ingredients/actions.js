

export const SET_SELECTED_INGREDIENT = "SET_SELECTED_INGREDIENT";
export const CLEAR_SELECTED_INGREDIENT = "CLEAR_SELECTED_INGREDIENT";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const UPDATE_CONSTRUCTOR = "REMOVE_INGREDIENT";
export const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";

export const setSelectedIngredient = (ingredient) => ({
  type: 'SET_SELECTED_INGREDIENT',
  payload: ingredient,
});

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

export const updateConstructor = (updatedConstructor) => {
  return { type: 'UPDATE_CONSTRUCTOR', payload: updatedConstructor };
};

export const setTotalPrice = (totalPrice) => ({
  type: SET_TOTAL_PRICE,
  payload: totalPrice
})