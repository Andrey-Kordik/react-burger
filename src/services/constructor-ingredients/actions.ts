
import { IIngredient } from '../types/types';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = "REMOVE_INGREDIENT";
export const REORDER_INGREDIENTS: 'REORDER_INGREDIENTS' = "REORDER_INGREDIENTS";
export const SET_TOTAL_PRICE: 'SET_TOTAL_PRICE' = "SET_TOTAL_PRICE";


export interface IAddIngredient{
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: IIngredient;
  readonly id: IIngredient["_id"];
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly payload: IIngredient;
  readonly id: IIngredient["_id"];
}

export interface IReorderIngredients {
  readonly type: typeof REORDER_INGREDIENTS;
  payload:{ fromIndex: number, toIndex:number }
}

export interface ISetPrice {
  readonly type: typeof SET_TOTAL_PRICE;
  payload: number
}

export type TIngredientsActions =
  | IAddIngredient
  | IRemoveIngredient
  | IReorderIngredients
  | ISetPrice;




export const addIngredient = (ingredient: IIngredient): IAddIngredient => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
  id: ingredient._id,
});

export const removeIngredient = (ingredient: IIngredient): IRemoveIngredient => ({
  type: REMOVE_INGREDIENT,
  payload: ingredient,
  id: ingredient._id,
});

export const reorderIngredients = (fromIndex: number, toIndex: number): IReorderIngredients => ({
  type: REORDER_INGREDIENTS,
  payload: { fromIndex, toIndex },
});

export const setTotalPrice = (totalPrice: number): ISetPrice => ({
  type: SET_TOTAL_PRICE,
  payload: totalPrice
})