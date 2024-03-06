import { reducer, initialState } from './reducer';
import {
  INGREDIENTS_LOAD_SUCCESS,
  INGREDIENTS_LOADING,
  INGREDIENTS_ERROR,
} from "./actions";
import { TEST_INGS, TEST_ERROR_MESSAGE } from '../../utils/test-constants'

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      initialState
  );
  });

  it('should handle INGREDIENTS_LOADING', () => {

    const action = { type: INGREDIENTS_LOADING };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual({
     ...initialState,
      loading: true,
    });
  });

  it('should handle INGREDIENTS_ERROR', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const action = { type: INGREDIENTS_ERROR, payload: TEST_ERROR_MESSAGE };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...initialState,
      loading: false,
      error: TEST_ERROR_MESSAGE
    });
  });

  it('should handle INGREDIENTS_LOAD_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };

    const action = { type: INGREDIENTS_LOAD_SUCCESS, payload: TEST_INGS };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...initialState,
      ingredients: TEST_INGS,
    });
  });

});