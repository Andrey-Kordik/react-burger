import { createAction } from "@reduxjs/toolkit";
import { AllOrders } from "../types/types";

export const allOrdersConnect = createAction<string, 'ALL_ORDERS_CONNECT'>('ALL_ORDERS_CONNECT');
export const allOrdersDisconnect = createAction("ALL_ORDERS_DISCONNECT");

export const wsAllOrdersConnecting = createAction("ALL_ORDERS_WS_CONNECTING");
export const wsAllOrdersOpen = createAction("ALL_ORDERS_WS_OPEN");
export const wsAllOrdersClose = createAction("ALL_ORDERS_WS_CLOSE");
export const wsAllOrdersError = createAction<string, "ALL_ORDERS_WS_ERROR">("ALL_ORDERS_WS_ERROR");
export const wsAllOrdersMessage = createAction<AllOrders, "ALL_ORDERS_WS_MESSAGE">("ALL_ORDERS_WS_MESSAGE");


export type TAllOrdersActions = ReturnType<typeof allOrdersConnect>
  | ReturnType<typeof allOrdersDisconnect>
  | ReturnType<typeof wsAllOrdersConnecting>
  | ReturnType<typeof wsAllOrdersOpen>
  | ReturnType<typeof wsAllOrdersClose>
  | ReturnType<typeof wsAllOrdersError>
  | ReturnType<typeof wsAllOrdersMessage>;
