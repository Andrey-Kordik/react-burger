import { ingredientsApi} from '../../utils/ingredients-api'
import { IIngredient } from '../types/types';
import {AppThunk, AppDispatch} from '../types/types'

export const INGREDIENTS_LOAD_SUCCESS: 'INGREDIENTS_LOAD_SUCCESS' = "INGREDIENTS_LOAD_SUCCESS";
export const INGREDIENTS_LOADING: 'INGREDIENTS_LOADING' = "INGREDIENTS_LOADING";
export const INGREDIENTS_ERROR: 'INGREDIENTS_ERROR' = "INGREDIENTS_ERROR";

export interface IIngredientsLoadSuccessAction {
  readonly type: typeof INGREDIENTS_LOAD_SUCCESS;
  readonly payload: IIngredient[];
}

export interface IIngrerdientsLoadingAction {
  readonly type: typeof INGREDIENTS_LOADING;
}

export interface IIngredientsErrorAction {
  readonly type: typeof INGREDIENTS_ERROR;
  readonly payload: string;
}

export type TGetIngredientsActions =
    | IIngredientsLoadSuccessAction
  | IIngrerdientsLoadingAction
  | IIngredientsErrorAction


export const loadIngredients = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch({type: INGREDIENTS_LOADING});
  return ingredientsApi.getIngredients().then(res => {
      dispatch({
          type: INGREDIENTS_LOAD_SUCCESS,
          payload: res.data
      });
  })
  .catch(error => {
      dispatch({
          type: INGREDIENTS_ERROR,
          payload: error.message
      });
  });

};

