import { combineReducers } from 'redux';
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as selectedIngReducer} from './constructor-ingredients/reducer'
import { reducer as orderNumReducer} from './order-details/reducer'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredients: selectedIngReducer,
  orderNumber: orderNumReducer
})