import { ThunkAction } from 'redux-thunk';
import { TOrderActions } from '../order-details/actions';
import { TIngredientsActions } from '../constructor-ingredients/actions';
import { TGetIngredientsActions } from '../ingredients/actions';
import { rootReducer } from '../root-reducer';
import { TAuthActions } from '../auth/actions';
import { TAllOrdersActions } from '../ws-all-orders/actions';
import { TMyOrdersActions } from '../ws-my-orders/actions'

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions = | TOrderActions
  | TIngredientsActions
  | TGetIngredientsActions
  | TAuthActions
  | TMyOrdersActions
  | TAllOrdersActions;


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, TApplicationActions>;

export type AppDispatch<TReturnType = void> = (action: TApplicationActions | AppThunk<TReturnType>
) => TReturnType;

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  key?: string;
  __v: number;
}

export interface IUser  {
  name: string ;
  email: string;
  password: string;
}

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export interface AllOrders {
  orders: Order[];
  total: number;
  totalToday: number;
}

export interface Order {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name:string
}