import { reducer, initialState } from './reducer';

import {
  REGISTER_LOAD_SUCCESS,
  REGISTER_LOADING,
  REGISTER_ERROR,
  LOGIN_LOAD_SUCCESS,
  LOGIN_LOADING,
  LOGIN_ERROR,
  SET_IS_AUTH_CHECKED,
  SET_USER,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SEND_CODE_ERROR,
  SEND_CODE_SUCCESS,
  SEND_CODE_LOADING,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  EDIT_USER_DATA_ERROR,
  EDIT_USER_DATA_SUCCESS,
  EDIT_USER_DATA_LOADING,
  GET_USER_ERROR,
  SET_PASSWORD_RESET,
  GET_CURRENT_ORDER_FAILURE,
  GET_CURRENT_ORDER_SUCCESS
} from "./actions";

import {  TEST_ERROR_MESSAGE,TEST_USER, TEST_USER_2, TEST_ORDER } from '../../utils/test-constants'


describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle set password reset', () => {
    const action = { type: SET_PASSWORD_RESET, payload: true };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      isPasswordReset: true,
    });
  });

  it('should handle logout request', () => {
    const prevState = {
      ...initialState,
      user: TEST_USER,
    };

    const action = { type: LOGOUT_REQUEST };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: true,
      user: TEST_USER,
    });
  });

  it('should handle logout success', () => {
    const prevState = {
      ...initialState,
      loading: true,
      user: TEST_USER,
    };

    const action = { type: LOGOUT_SUCCESS };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle logout failure', () => {
    const prevState = {
      ...initialState,
      loading: true,
      user: TEST_USER,
    };

    const action = { type: LOGOUT_FAILURE, payload: TEST_ERROR_MESSAGE };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...initialState,
      error: TEST_ERROR_MESSAGE,
      user: TEST_USER
    });
  });

  it('should handle set auth checked', () => {
    const newIsAuthChecked = true;

    const action = { type: SET_IS_AUTH_CHECKED, payload: newIsAuthChecked };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      isAuthChecked: newIsAuthChecked
    });
  });

  it('should handle login loading', () => {

    const action = { type: LOGIN_LOADING };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle login error', () => {

    const action = { type: LOGIN_ERROR, payload: TEST_ERROR_MESSAGE };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      error: TEST_ERROR_MESSAGE,
    });
  });

  it('should handle login success', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = { type: LOGIN_LOAD_SUCCESS, payload: { user: TEST_USER } };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      user: TEST_USER,
      isAuthChecked: true
    });
  });

  it('should handle register loading', () => {

    const action = { type: REGISTER_LOADING };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle register error', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = { type: REGISTER_ERROR, payload: TEST_ERROR_MESSAGE };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      error: TEST_ERROR_MESSAGE
    });
  });

  it('should handle register success', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = { type: REGISTER_LOAD_SUCCESS, payload: { user: TEST_USER } };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      user: TEST_USER,
      isAuthChecked: true
    });
  });

  it('should handle send code loading', () => {

    const action = { type: SEND_CODE_LOADING };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should handle send code error', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = { type: SEND_CODE_ERROR, payload: TEST_ERROR_MESSAGE };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      error: TEST_ERROR_MESSAGE,

    });
  });

  it('should handle send code success', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };

    const action = { type: SEND_CODE_SUCCESS };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle reset password loading', () => {

    const action = { type: RESET_PASSWORD_LOADING };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should handle reset password error', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = { type: RESET_PASSWORD_ERROR, payload: TEST_ERROR_MESSAGE };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      error: TEST_ERROR_MESSAGE
    });
  });

  it('should handle reset password success', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = { type: RESET_PASSWORD_SUCCESS };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle set user', () => {

    const action = { type: SET_USER, payload: TEST_USER };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      user: TEST_USER
    });
  });

  it('should handle edit user loading', () => {
    const prevState = {
      ...initialState,
      user: TEST_USER
    };

    const action = { type: EDIT_USER_DATA_LOADING };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: true,
      user: TEST_USER
    });
  });

  it('should handle edit user error', () => {
    const prevState = {
      ...initialState,
      loading: true,
      user: TEST_USER
    };

    const action = { type: EDIT_USER_DATA_ERROR, payload: TEST_ERROR_MESSAGE };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      error: TEST_ERROR_MESSAGE,
      user: TEST_USER,
    });
  });

  it('should handle edit user success', () => {
    const prevState = {
      ...initialState,
      loading: true,
      user: TEST_USER,
    };

    const action = { type: EDIT_USER_DATA_SUCCESS, payload: TEST_USER_2 };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      user: TEST_USER_2
    });
  });

  it('should handle get user error', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };

    const action = { type: GET_USER_ERROR, payload: TEST_ERROR_MESSAGE };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      error: TEST_ERROR_MESSAGE
    });
  });

  it('should handle get order error', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };

    const action = { type: GET_CURRENT_ORDER_FAILURE, payload: TEST_ERROR_MESSAGE };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      error: TEST_ERROR_MESSAGE
    });
  });

  it('should handle get order succcess', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = { type: GET_CURRENT_ORDER_SUCCESS, payload: TEST_ORDER };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      currentOrder: TEST_ORDER
    });
  });


});