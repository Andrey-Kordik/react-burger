import { createAction } from "@reduxjs/toolkit";
import { AllOrders } from "../types/types";

export const myOrdersConnect = createAction<string, 'MY_ORDERS_CONNECT'>('MY_ORDERS_CONNECT');
export const myOrdersDisconnect = createAction("MY_ORDERS_DISCONNECT");

export const wsMyOrdersConnecting = createAction("MY_ORDERS_WS_CONNECTING");
export const wsMyOrdersOpen = createAction("MY_ORDERS_WS_OPEN");
export const wsMyOrdersClose = createAction("MY_ORDERS_WS_CLOSE");
export const wsMyOrdersError = createAction<string, "MY_ORDERS_WS_ERROR">("MY_ORDERS_WS_ERROR");
export const wsMyOrdersMessage = createAction<AllOrders, "MY_ORDERS_WS_MESSAGE">("MY_ORDERS_WS_MESSAGE");


export type TMyOrdersActions = ReturnType<typeof myOrdersConnect>
  | ReturnType<typeof myOrdersDisconnect>
  | ReturnType<typeof wsMyOrdersConnecting>
  | ReturnType<typeof wsMyOrdersOpen>
  | ReturnType<typeof wsMyOrdersClose>
  | ReturnType<typeof wsMyOrdersError>
  | ReturnType<typeof wsMyOrdersMessage>;
