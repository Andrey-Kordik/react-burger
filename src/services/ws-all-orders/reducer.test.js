import { allOrdersReducer, initialState } from './reducer';
import { WebsocketStatus } from "../types/types";

import {
  wsAllOrdersClose,
  wsAllOrdersConnecting,
  wsAllOrdersError,
  wsAllOrdersMessage,
  wsAllOrdersOpen,
} from "./actions";

import { TEST_ERROR_MESSAGE, TEST_ORDER } from '../../utils/test-constants'

describe('all orders reducer', () => {
  it('should return the initial state', () => {
    expect(allOrdersReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle wsAllOrdersConnecting', () => {
    const newState = allOrdersReducer(undefined, wsAllOrdersConnecting());
    expect(newState).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
      loading: true
    });
  });
  it('should handle wsAllOrdersOpen', () => {
    const newState = allOrdersReducer(undefined, wsAllOrdersOpen());
    expect(newState).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE
    });
  });
  it('should handle wsAllOrdersClose', () => {
    const newState = allOrdersReducer(undefined, wsAllOrdersClose());
    expect(newState).toEqual(initialState);
  });
  it('should handle wsAllOrdersError', () => {
    const newState = allOrdersReducer(undefined, wsAllOrdersError(TEST_ERROR_MESSAGE));
    expect(newState).toEqual({
      ...initialState,
      connectionError: TEST_ERROR_MESSAGE
    });
  });

  it('should handle wsAllOrdersMessage', () => {
    const payload = {
      orders: [TEST_ORDER],
      total: 1,
      totalToday: 1
    };
    const newState = allOrdersReducer(undefined, wsAllOrdersMessage(payload));
    expect(newState).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
      allOrders: {
        orders: [TEST_ORDER],
        total: 1,
        totalToday: 1,
      }
    });
  });


});