import { reducer } from './reducer';

import {
  ORDER_LOAD_SUCCESS,
  ORDER_LOADING,
  ORDER_ERROR,
  CLEAR_ORDER_NUMBER
} from "./actions";

import { TEST_ERROR_MESSAGE } from '../../utils/constants.ts'

describe('order details reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      orderNumber: null,
      loading: false,
      error: null
    });
  });
  it('should handle order load', () => {
    const prevState = {
      orderNumber: null,
      loading: false,
      error: null
    };

    const action = { type: ORDER_LOADING };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      orderNumber: null,
      loading: true,
      error: null
    });
  });

  it('should handle order error', () => {
    const prevState = {
      orderNumber: null,
      loading: true,
      error: null
    };

    const action = { type: ORDER_ERROR, payload: TEST_ERROR_MESSAGE};
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      orderNumber: null,
      loading: false,
      error: TEST_ERROR_MESSAGE
    });
  });

  it('should handle order success', () => {
    const prevState = {
      orderNumber: null,
      loading: true,
      error: null
    };

    const action = { type: ORDER_LOAD_SUCCESS, payload: 12345 };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      orderNumber: 12345,
      loading: false,
      error: null
    });
  });

  it('should handle clear order number', () => {
    const prevState = {
      orderNumber: 12345,
      loading: false,
      error: null
    };

    const action = { type: CLEAR_ORDER_NUMBER };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      orderNumber: null,
      loading: false,
      error: null
    });
  });

});