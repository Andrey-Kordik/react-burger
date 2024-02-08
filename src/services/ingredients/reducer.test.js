import { reducer } from './reducer';
import {
  INGREDIENTS_LOAD_SUCCESS,
  INGREDIENTS_LOADING,
  INGREDIENTS_ERROR,
} from "./actions";
import { TEST_INGS, TEST_ERROR_MESSAGE } from '../../utils/constants.ts'


describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });
  });

  it('should handle INGREDIENTS_LOADING', () => {
    const prevState = {
      ingredients: [],
      loading: false,
      error: null
    };
    const action = { type: INGREDIENTS_LOADING };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  it('should handle INGREDIENTS_ERROR', () => {
    const prevState = {
      ingredients: [],
      loading: true,
      error: null
    };
    const action = { type: INGREDIENTS_ERROR, payload: TEST_ERROR_MESSAGE };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ingredients: [],
      loading: false,
      error: TEST_ERROR_MESSAGE
    });
  });

  it('should handle INGREDIENTS_LOAD_SUCCESS', () => {
    const prevState = {
      ingredients: [],
      loading: true,
      error: null
    };

    const action = { type: INGREDIENTS_LOAD_SUCCESS, payload: TEST_INGS };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ingredients: TEST_INGS,
      loading: false,
      error: null
    });
  });

});