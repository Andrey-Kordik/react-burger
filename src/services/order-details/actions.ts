import { authApi } from '../../utils/auth-api'
import {AppThunk, AppDispatch} from '../types/types'

export const ORDER_LOAD_SUCCESS: 'ORDER_LOAD_SUCCESS' = "ORDER_LOAD_SUCCESS";
export const ORDER_LOADING: 'ORDER_LOADING' = "ORDER_LOADING";
export const ORDER_ERROR: 'ORDER_ERROR' = "ORDER_ERROR";
export const CLEAR_ORDER_NUMBER: 'CLEAR_ORDER_NUMBER' = "CLEAR_ORDER_NUMBER";


export interface IOrderLoadSuccessAction {
  readonly type: typeof ORDER_LOAD_SUCCESS;
  readonly payload: number;
}

export interface IOrderLoadingAction {
  readonly type: typeof ORDER_LOADING;
}

export interface IOrderErrorAction {
  readonly type: typeof ORDER_ERROR;
  readonly payload: string;
}

export interface IClearOrderNumberAction {
  readonly type: typeof CLEAR_ORDER_NUMBER;
}

export type TOrderActions =
    | IOrderLoadSuccessAction
  | IOrderLoadingAction
  | IOrderErrorAction
  | IClearOrderNumberAction;

export const loadOrderNumber = (ids: string []): AppThunk => (dispatch: AppDispatch) => {
  dispatch({ type: ORDER_LOADING });
  return authApi.getOrder(ids).then((res) => {
    dispatch({
      type: ORDER_LOAD_SUCCESS,
      payload: res.order.number,
    });
  })
    .catch((error) => {
      dispatch({
        type: ORDER_ERROR,
        payload: error.message,
      });
    });
};

export const clearOrderNumber = (): IClearOrderNumberAction => ({
  type: 'CLEAR_ORDER_NUMBER'
});
