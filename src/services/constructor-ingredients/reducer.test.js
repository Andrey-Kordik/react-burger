import { reducer } from './reducer';

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REORDER_INGREDIENTS,
  SET_TOTAL_PRICE
} from "./actions";

import { TEST_BUN, TEST_MAIN, TEST_INGS } from '../../utils/test-constants'

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      burgerConstructor: {
        bun: null ,
        ingredients: [],
      },
      totalPrice: 0,
    });
  });

  it('should add bun ingredient', () => {
    const prevState = {
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      totalPrice: 0
    };
    const action = { type: ADD_INGREDIENT, payload: TEST_BUN};
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      burgerConstructor: {
        bun: TEST_BUN,
        ingredients: []
      },
      totalPrice: 0
    });
  });

  it('should add main ingredient', () => {
    const prevState = {
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      totalPrice: 0
    };
    const action = { type: ADD_INGREDIENT, payload: { ...TEST_MAIN }, id: TEST_MAIN._id };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      burgerConstructor: {
        bun: null,
        ingredients: [TEST_MAIN]
      },
      totalPrice: 0
    })
  })

  it('should remove bun', () => {
    const prevState = {
      burgerConstructor: {
        bun: TEST_BUN,
        ingredients: []
      },
      totalPrice: 0
    };
    const action = { type: REMOVE_INGREDIENT, payload: TEST_BUN };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      totalPrice: 0
    });
  });

  it('should remove main ingredient ', () => {;
    const prevState = {
      burgerConstructor: {
        bun: null,
        ingredients: [TEST_MAIN]
      },
      totalPrice: 0
    };
    const action = { type: REMOVE_INGREDIENT, payload: TEST_MAIN};
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      totalPrice: 0
    });
  });

  it('should reorder ingredients correctly', () => {
    const prevState = {
      burgerConstructor: {
        bun: null,
        ingredients: [...TEST_INGS]
      },
      totalPrice: 0
    };

    const fromIndex = 0;
    const toIndex = 2;
    const action = { type: REORDER_INGREDIENTS, payload: { fromIndex, toIndex } };
    const nextState = reducer(prevState, action);


    const expectedIngredients = [...TEST_INGS];
    expectedIngredients.splice(toIndex, 0, expectedIngredients.splice(fromIndex, 1)[0]);

    expect(nextState).toEqual({
      burgerConstructor: {
        bun: null,
        ingredients: expectedIngredients
      },
      totalPrice: 0
    });
  });

  it('should set total price', () => {
    const prevState = {
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      totalPrice: 0
    };

    const newTotalPrice = 100;

    const action = { type: SET_TOTAL_PRICE, payload: newTotalPrice };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      totalPrice: newTotalPrice
    });
  });



});