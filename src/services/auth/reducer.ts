import {
  REGISTER_LOAD_SUCCESS,
  REGISTER_LOADING,
  REGISTER_ERROR,
  LOGIN_LOAD_SUCCESS,
  LOGIN_LOADING,
  LOGIN_ERROR,
  SET_IS_AUTH_CHECKED,
  SET_USER,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SEND_CODE_ERROR,
  SEND_CODE_SUCCESS,
  SEND_CODE_LOADING,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  EDIT_USER_DATA_ERROR,
  EDIT_USER_DATA_SUCCESS,
  EDIT_USER_DATA_LOADING,
  GET_USER_ERROR,
  SET_PASSWORD_RESET,
  GET_CURRENT_ORDER_FAILURE,
  GET_CURRENT_ORDER_SUCCESS
} from "./actions";

import { IUser, Order } from "../types/types";
import { TAuthActions } from "./actions";

export type TAuthState = {
  loading: boolean;
  error: null | string;
  user: IUser | null,
  accessToken: string,
  refreshToken: string,
  isAuthChecked: boolean,
  isPasswordReset: boolean,
  currentOrder: Order | null
};

const initialState = {
  loading: false,
  error: null,
  user: null,
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  isAuthChecked: false,
  isPasswordReset: false,
  currentOrder:null
};

export const reducer = (state: TAuthState  = initialState, action: TAuthActions) : TAuthState => {
  switch (action.type) {
    case SET_PASSWORD_RESET:
      return {
        ...state,
        isPasswordReset: action.payload,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: "",
        refreshToken: "",
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_IS_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOGIN_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case REGISTER_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case SEND_CODE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEND_CODE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SEND_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case RESET_PASSWORD_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case EDIT_USER_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_USER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
      case GET_USER_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case GET_CURRENT_ORDER_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
          case GET_CURRENT_ORDER_SUCCESS:
            return {
              ...state,
              loading: false,
              currentOrder: action.payload,
            };
    default:
      return state;
  }
};