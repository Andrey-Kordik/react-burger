import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../types/types";
import {
  wsAllOrdersClose,
  wsAllOrdersConnecting,
  wsAllOrdersError,
  wsAllOrdersMessage,
  wsAllOrdersOpen,
} from "./actions";
import { AllOrders } from "../types/types";

export type TAllOrdersStore = {
  status: WebsocketStatus;
  allOrders: AllOrders;
  connectionError: string;
  loading:boolean
};

export const initialState: TAllOrdersStore = {
  status: WebsocketStatus.OFFLINE,
  allOrders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  connectionError: "",
  loading: false
};

export const allOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsAllOrdersConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
      state.loading = true;
    })
    .addCase(wsAllOrdersOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.loading = false;
    })
    .addCase(wsAllOrdersClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
      state.loading = false;
    })
    .addCase(wsAllOrdersError, (state, action) => {
      state.connectionError = action.payload;
      state.loading = false;
    })
    .addCase(wsAllOrdersMessage, (state, action) => {
      state.status = WebsocketStatus.ONLINE;
      state.allOrders = {
        orders: action.payload.orders || [],
        total: action.payload.total || 0,
        totalToday: action.payload.totalToday || 0,
      };
      state.loading = false;
    });
});