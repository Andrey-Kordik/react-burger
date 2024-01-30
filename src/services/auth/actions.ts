import { authApi } from '../../utils/auth-api'
import { AppThunk, AppDispatch } from '../types/types'
import { IUser, Order } from '../types/types';

export const REGISTER_LOAD_SUCCESS: 'REGISTER_LOAD_SUCCESS' = "REGISTER_LOAD_SUCCESS";
export const REGISTER_LOADING: 'REGISTER_LOADING' = "REGISTER_LOADING";
export const REGISTER_ERROR: 'REGISTER_ERROR' = "REGISTER_ERROR";

export const LOGIN_LOAD_SUCCESS: 'LOGIN_LOAD_SUCCESS' = "LOGIN_LOAD_SUCCESS";
export const LOGIN_LOADING: 'LOGIN_LOADING' = "LOGIN_LOADING";
export const LOGIN_ERROR: 'LOGIN_ERROR' = "LOGIN_ERROR";

export const GET_USER: 'GET_USER' = "GET_USER";
export const SET_IS_AUTH_CHECKED: 'SET_IS_AUTH_CHECKED' = 'SET_IS_AUTH_CHECKED'
export const SET_USER: 'SET_USER' = "SET_USER";

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = "LOGOUT_SUCCESS"
export const LOGOUT_FAILURE: 'LOGOUT_FAILURE' = "LOGOUT_FAILURE"

export const SEND_CODE_LOADING: 'SEND_CODE_LOADING' = "SEND_CODE_LOADING"
export const SEND_CODE_SUCCESS: 'SEND_CODE_SUCCESS' = "SEND_CODE_SUCCESS"
export const SEND_CODE_ERROR: 'SEND_CODE_ERROR' = "SEND_CODE_ERROR"

export const RESET_PASSWORD_LOADING: 'RESET_PASSWORD_LOADING' = "RESET_PASSWORD_LOADING"
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = "RESET_PASSWORD_SUCCESS"
export const RESET_PASSWORD_ERROR: 'RESET_PASSWORD_ERROR' = "RESET_PASSWORD_ERROR"

export const EDIT_USER_DATA_LOADING: 'EDIT_USER_DATA_LOADING' = "EDIT_USER_DATA_LOADING"
export const EDIT_USER_DATA_SUCCESS: 'EDIT_USER_DATA_SUCCESS' = "EDIT_USER_DATA_SUCCESS"
export const EDIT_USER_DATA_ERROR: 'EDIT_USER_DATA_ERROR' = "EDIT_USER_DATA_ERROR"

export const GET_USER_ERROR: 'GET_USER_ERROR' = "GET_USER_ERROR"
export const SET_PASSWORD_RESET: 'SET_PASSWORD_RESET' = 'SET_PASSWORD_RESET';

export const GET_CURRENT_ORDER_SUCCESS: 'GET_CURRENT_ORDER_SUCCESS' = "GET_CURRENT_ORDER_SUCCESS";
export const GET_CURRENT_ORDER_FAILURE: 'GET_CURRENT_ORDER_FAILURE' = "GET_CURRENT_ORDER_FAILURE";

export interface IRegisterLoadSuccessAction {
  readonly type: typeof REGISTER_LOAD_SUCCESS;
  readonly payload: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IRegisterLoadingAction {
  readonly type: typeof REGISTER_LOADING;
}

export interface IRegisterErrorAction {
  readonly type: typeof REGISTER_ERROR;
  readonly payload: string;
}


export interface ILoginLoadSuccessAction {
  readonly type: typeof LOGIN_LOAD_SUCCESS;
  readonly payload: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ILoginLoadingAction {
  readonly type: typeof LOGIN_LOADING;
}

export interface ILoginErrorAction {
  readonly type: typeof LOGIN_ERROR;
  readonly payload: string;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER;
  readonly payload: IUser;
}

export interface IGetUserFailureAction {
  readonly type: typeof GET_USER_ERROR;
  readonly payload: string;
}

export interface ISetIsAuthCheckedAction {
  readonly type: typeof SET_IS_AUTH_CHECKED;
  readonly payload: boolean;
}

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: IUser | null;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutErrorAction {
  readonly type: typeof LOGOUT_FAILURE;
  readonly payload: string;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ISendCodeLoadingAction {
  readonly type: typeof SEND_CODE_LOADING;
}

export interface ISendCodeFailureAction {
  readonly type: typeof SEND_CODE_ERROR;
  readonly payload: string;
}

export interface ISendCodeSuccessAction {
  readonly type: typeof SEND_CODE_SUCCESS;
  readonly payload: Response;
}

export interface IResetPaswordLoadingAction {
  readonly type: typeof RESET_PASSWORD_LOADING;
}

export interface IResetPaswordFailureAction {
  readonly type: typeof RESET_PASSWORD_ERROR;
  readonly payload: string;
}

export interface IResetPaswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly payload: Response

}

export interface IEditUserLoadingAction {
  readonly type: typeof EDIT_USER_DATA_LOADING;
}

export interface IEditUserFailureAction {
  readonly type: typeof EDIT_USER_DATA_ERROR;
  readonly payload: string;
}

export interface IEditUserSuccessAction {
  readonly type: typeof EDIT_USER_DATA_SUCCESS;
  readonly payload: IUser

}

export interface ISetIsPasswordResetAction {
  readonly type: typeof SET_PASSWORD_RESET;
  readonly payload: boolean;
}


export interface IGetCurrentOrderSuccessAction {
  readonly type: typeof GET_CURRENT_ORDER_SUCCESS;
  readonly payload: Order;
}

export interface IGetCurrentOrderFailureAction {
  readonly type: typeof GET_CURRENT_ORDER_FAILURE;
  readonly payload: string;
}


export type TAuthActions =
  | IRegisterLoadSuccessAction
  | IRegisterLoadingAction
  | IRegisterErrorAction
  | ILoginLoadSuccessAction
  | ILoginLoadingAction
  | ILoginErrorAction
  | IGetUserSuccessAction
  | IGetUserFailureAction
  | ISetIsAuthCheckedAction
  | ISetUserAction
  | ILogoutRequestAction
  | ILogoutErrorAction
  | ILogoutSuccessAction
  | ISendCodeLoadingAction
  | ISendCodeFailureAction
  | ISendCodeSuccessAction
  | IResetPaswordLoadingAction
  | IResetPaswordFailureAction
  | IResetPaswordSuccessAction
  | IEditUserLoadingAction
  | IEditUserFailureAction
  | IEditUserSuccessAction
  | ISetIsPasswordResetAction
  | IGetCurrentOrderSuccessAction
  | IGetCurrentOrderFailureAction;


export const setPasswordReset = (isReset: boolean) => ({
  type: SET_PASSWORD_RESET,
  payload: isReset,
});

export const setUser = (user: IUser | null) => ({
  type: SET_USER,
  payload: user,
}
);

export const getCurrentOrder = (number: number): AppThunk => (dispatch: AppDispatch) => {
  return authApi.getCurrentOrder(number).then(res => {
      dispatch({
          type: GET_CURRENT_ORDER_SUCCESS,
          payload: res
      });
  })
  .catch(error => {
      dispatch({
          type: GET_CURRENT_ORDER_FAILURE,
          payload: error.message
      });
  });
};


export const editUserData = (email: string, name: string, password: string) => (dispatch: AppDispatch) => {
  dispatch({ type: EDIT_USER_DATA_LOADING });
  return authApi.editUserData(email, name, password)
    .then(res => {
      console.log(res)
      dispatch({
        type: EDIT_USER_DATA_SUCCESS,
        payload: res
      });
    })
    .catch(error => {
      dispatch({
        type: EDIT_USER_DATA_ERROR,
        payload: error.message,
      });
      console.log(error.message);
    });
};


export const resetPassword = (token: string, password: string): AppThunk => (dispatch: AppDispatch) => {
  dispatch({ type: RESET_PASSWORD_LOADING });
  return authApi.resetPassword(token, password)
    .then(res => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res
      });
    })
    .catch(error => {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: error.message,
      });
      console.log(error.message);
    });
};


export const sendCode = (email: string): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: SEND_CODE_LOADING });

    return authApi.sendCode(email)
      .then(function (res) {
        dispatch({
          type: SEND_CODE_SUCCESS,
          payload: res,
        });
      })
      .catch(function (error) {
        dispatch({
          type: SEND_CODE_ERROR,
          payload: error.message,
        });
        console.log(error.message);
      });
  };
};


export const logout = (): AppThunk => (dispatch: AppDispatch, getState) => {
  dispatch({ type: LOGOUT_REQUEST });
  const refreshToken = getState().authReducer.refreshToken;
  return authApi.logout(refreshToken)
    .then(data => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(setUser(null));
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: error.message,
      });
    });
};


export const register = (name: string, email: string, password: string): AppThunk => (dispatch: AppDispatch) => {
  dispatch({ type: REGISTER_LOADING });
  return authApi.register(name, email, password)
    .then(res => {
      dispatch({
        type: REGISTER_LOAD_SUCCESS,
        payload: res
      });
      dispatch(setIsAuthChecked(true))
    })
    .catch(error => {
      dispatch({
        type: REGISTER_ERROR,
        payload: error.message,
      });
      console.log(error.message);
    });
};

export const login = (email: string, password: string): AppThunk => (dispatch: AppDispatch) => {
  dispatch({ type: LOGIN_LOADING });
  return authApi.authorize(email, password)
    .then(res => {
      dispatch({
        type: LOGIN_LOAD_SUCCESS,
        payload: res,
      });
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("accessToken", res.accessToken);
      dispatch(setUser(res.user));
      dispatch(setIsAuthChecked(true))
    })
    .catch(error => {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });
      console.log(error.message);
    });
};



export const setIsAuthChecked = (value: boolean) => ({
  type: SET_IS_AUTH_CHECKED,
  payload: value
})


export const getUser = (): AppThunk => {
  return (dispatch: AppDispatch) => {
    return authApi.getUserData().then((res) => {
      dispatch(setUser(res.user));
    })
      .catch(error => {
        dispatch({
          type: GET_USER_ERROR,
          payload: error.message,
        });
        console.log(error.message);
      });
  }
};

export const checkUserAuth = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      if (localStorage.getItem('accessToken')) {
       dispatch(getUser());
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  };
};