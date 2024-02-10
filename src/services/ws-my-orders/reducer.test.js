import { myOrdersReducer, initialState } from './reducer';
import { WebsocketStatus } from "../types/types";

import {
  wsMyOrdersClose,
  wsMyOrdersConnecting,
  wsMyOrdersError,
  wsMyOrdersMessage,
  wsMyOrdersOpen,
} from "./actions";

import { TEST_ERROR_MESSAGE, TEST_ORDER } from '../../utils/test-constants'

describe('all orders reducer', () => {
  it('should return the initial state', () => {
    expect(myOrdersReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle wsMyOrdersConnecting', () => {
    const newState = myOrdersReducer(undefined, wsMyOrdersConnecting());
    expect(newState).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
      loading: true
    });
  });

  it('should handle wsMyOrdersOpen', () => {
    const newState = myOrdersReducer(undefined, wsMyOrdersOpen());
    expect(newState).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it('should handle wsMyOrdersClose', () => {
    const newState = myOrdersReducer(undefined, wsMyOrdersClose());
    expect(newState).toEqual(initialState);
  });

    it('should handle wsMyOrdersError', () => {
    const newState = myOrdersReducer(undefined, wsMyOrdersError(TEST_ERROR_MESSAGE));
    expect(newState).toEqual({
      ...initialState,
      connectionError: TEST_ERROR_MESSAGE,
    });
  });

  it('should handle wsMyOrdersMessage', () => {
    const payload = {
      orders: [TEST_ORDER],
      total: 1,
      totalToday: 1
    };
    const newState = myOrdersReducer(undefined, wsMyOrdersMessage(payload));
    expect(newState).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
      myOrders: {
        orders: [TEST_ORDER],
        total: 1,
        totalToday: 1,
      }
    });
  });

});