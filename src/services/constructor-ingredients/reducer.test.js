import { reducer, initialState } from './reducer';

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REORDER_INGREDIENTS,
  SET_TOTAL_PRICE
} from "./actions";

import { TEST_BUN, TEST_MAIN, TEST_INGS } from '../../utils/test-constants'

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should add bun ingredient', () => {
    const action = { type: ADD_INGREDIENT, payload: TEST_BUN};
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      burgerConstructor: {
        bun: TEST_BUN,
        ingredients: []
      }
    });
  });

  it('should add main ingredient', () => {
    const action = { type: ADD_INGREDIENT, payload: { ...TEST_MAIN }, id: TEST_MAIN._id };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      burgerConstructor: {
        bun: null,
        ingredients: [TEST_MAIN]
      }
    })
  })

  it('should remove bun', () => {
    const prevState = {
      ...initialState,
      burgerConstructor: {
        bun: TEST_BUN,
        ingredients: []
      },
    };
    const action = { type: REMOVE_INGREDIENT, payload: TEST_BUN };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should remove main ingredient ', () => {;
    const prevState = {
      ...initialState,
      burgerConstructor: {
        bun: null,
        ingredients: [TEST_MAIN]
      }
    };

    const action = { type: REMOVE_INGREDIENT, payload: TEST_MAIN};
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should reorder ingredients correctly', () => {
    const prevState = {
      ...initialState,
      burgerConstructor: {
        bun: null,
        ingredients: [...TEST_INGS]
      },
    };

    const fromIndex = 0;
    const toIndex = 2;
    const action = { type: REORDER_INGREDIENTS, payload: { fromIndex, toIndex } };
    const nextState = reducer(prevState, action);


    const expectedIngredients = [...TEST_INGS];
    expectedIngredients.splice(toIndex, 0, expectedIngredients.splice(fromIndex, 1)[0]);

    expect(nextState).toEqual({
      ...initialState,
      burgerConstructor: {
        bun: null,
        ingredients: expectedIngredients
      }
    });
  });

  it('should set total price', () => {
    const newTotalPrice = 100;

    const action = { type: SET_TOTAL_PRICE, payload: newTotalPrice };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      totalPrice: newTotalPrice
    });
  });



});