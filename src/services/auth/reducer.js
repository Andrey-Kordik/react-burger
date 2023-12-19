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
  RESET_PASSWORD_SUCCESS
} from "./actions";

const initialState = {
  loading: false,
  error: null,
  user: null,
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  isAuthChecked: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};