import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';
import { socketMiddleware } from './middlewares/socket-middleware';

import {
  allOrdersConnect,
  allOrdersDisconnect,
  wsAllOrdersConnecting,
  wsAllOrdersOpen,
  wsAllOrdersClose,
  wsAllOrdersError,
  wsAllOrdersMessage,
} from "./ws-all-orders/actions";


import {
  myOrdersConnect,
  myOrdersDisconnect,
  wsMyOrdersConnecting,
  wsMyOrdersOpen,
  wsMyOrdersClose,
  wsMyOrdersError,
  wsMyOrdersMessage,
} from "./ws-my-orders/actions";

const allOrdersMiddleware = socketMiddleware({
  wsConnect: allOrdersConnect,
  wsDisconnect: allOrdersDisconnect,
  wsConnecting: wsAllOrdersConnecting,
  onOpen: wsAllOrdersOpen,
  onError: wsAllOrdersError,
  onClose: wsAllOrdersClose,
  onMessage: wsAllOrdersMessage,
});

const myOrdersMiddleware = socketMiddleware({
  wsConnect: myOrdersConnect,
  wsDisconnect: myOrdersDisconnect,
  wsConnecting: wsMyOrdersConnecting,
  onOpen: wsMyOrdersOpen,
  onError: wsMyOrdersError,
  onClose: wsMyOrdersClose,
  onMessage: wsMyOrdersMessage,
});


export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, allOrdersMiddleware, myOrdersMiddleware))
  );

  return store;
};