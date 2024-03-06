import { reducer, initialState} from './reducer';

import {
  ORDER_LOAD_SUCCESS,
  ORDER_LOADING,
  ORDER_ERROR,
  CLEAR_ORDER_NUMBER
} from "./actions";

import { TEST_ERROR_MESSAGE } from '../../utils/test-constants'

describe('order details reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle order load', () => {

    const action = { type: ORDER_LOADING };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle order error', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };

    const action = { type: ORDER_ERROR, payload: TEST_ERROR_MESSAGE};
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      error: TEST_ERROR_MESSAGE
    });
  });

  it('should handle order success', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };

    const action = { type: ORDER_LOAD_SUCCESS, payload: 12345 };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      orderNumber: 12345
    });
  });

  it('should handle clear order number', () => {
    const prevState = {
      ...initialState,
      orderNumber: 12345
    };

    const action = { type: CLEAR_ORDER_NUMBER };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });

});