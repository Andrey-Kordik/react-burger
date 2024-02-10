import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../types/types";
import {
  wsMyOrdersClose,
  wsMyOrdersConnecting,
  wsMyOrdersError,
  wsMyOrdersMessage,
  wsMyOrdersOpen,
} from "./actions";
import { AllOrders } from "../types/types";

export type TMyOrdersStore = {
  status: WebsocketStatus;
  myOrders: AllOrders;
  connectionError: string;
  loading:boolean
};

export const initialState: TMyOrdersStore = {

  status: WebsocketStatus.OFFLINE,
  myOrders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  connectionError: "",
  loading: false
};

export const myOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsMyOrdersConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
      state.loading = true;
    })
    .addCase(wsMyOrdersOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.loading = false;
    })
    .addCase(wsMyOrdersClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
      state.loading = false;
    })
    .addCase(wsMyOrdersError, (state, action) => {
      state.connectionError = action.payload;
      state.loading = false;
    })
    .addCase(wsMyOrdersMessage, (state, action) => {

      state.status = WebsocketStatus.ONLINE;

      state.myOrders = {
        orders: action.payload.orders || [],
        total: action.payload.total || 0,
        totalToday: action.payload.totalToday || 0,
      };
      state.loading = false;
    });
});