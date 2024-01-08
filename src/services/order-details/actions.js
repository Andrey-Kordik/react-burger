import { authApi } from '../../utils/auth-api'

export const ORDER_LOAD_SUCCESS = "ORDER_LOAD_SUCCESS";
export const ORDER_LOADING = "ORDER_LOADING";
export const ORDER_ERROR = "ORDER_ERROR";
export const CLEAR_ORDER_NUMBER = "CLEAR_ORDER_NUMBER";

export const loadOrderNumber = (ids) => (dispatch) => {
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

export const clearOrderNumber = () => ({
  type: 'CLEAR_ORDER_NUMBER'
});
