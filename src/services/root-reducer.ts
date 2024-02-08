import { combineReducers } from 'redux';
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as selectedIngReducer} from './constructor-ingredients/reducer'
import { reducer as orderNumReducer} from './order-details/reducer'
import {reducer as authReducer} from './auth/reducer'
import {allOrdersReducer } from './ws-all-orders/reducer'
import { myOrdersReducer } from './ws-my-orders/reducer';

export const rootReducer = combineReducers({
  authReducer: authReducer,
  ingredients: ingredientsReducer,
  selectedIngredients: selectedIngReducer,
  orderNumber: orderNumReducer,
  allOrders: allOrdersReducer,
  myOrders: myOrdersReducer
})