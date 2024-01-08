import { authApi } from '../../utils/auth-api'

export const REGISTER_LOAD_SUCCESS = "REGISTER_LOAD_SUCCESS";
export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const LOGIN_LOAD_SUCCESS = "LOGIN_LOAD_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const GET_USER = "GET_USER";
export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED'
export const SET_USER = "SET_USER";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILURE = "LOGOUT_FAILURE"

export const SEND_CODE_LOADING = "SEND_CODE_LOADING"
export const SEND_CODE_SUCCESS = "SEND_CODE_SUCCESS"
export const SEND_CODE_ERROR = "SEND_CODE_ERROR"

export const RESET_PASSWORD_LOADING = "SEND_CODE_LOADING"
export const RESET_PASSWORD_SUCCESS = "SEND_CODE_SUCCESS"
export const RESET_PASSWORD_ERROR = "SEND_CODE_ERROR"

export const EDIT_USER_DATA_LOADING = "SEND_CODE_LOADING"
export const EDIT_USER_DATA_SUCCESS = "SEND_CODE_SUCCESS"
export const EDIT_USER_DATA_ERROR = "SEND_CODE_ERROR"

export const GET_USER_ERROR = "GET_USER_ERROR"
export const SET_PASSWORD_RESET = 'SET_PASSWORD_RESET';

export const setPasswordReset = (isReset) => ({
  type: SET_PASSWORD_RESET,
  payload: isReset,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
}
);

export const getUser = () => {
  return (dispatch) => {
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

export const editUserData = (email, name, password) => (dispatch) => {
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


export const resetPassword = (token, password) => (dispatch) => {
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


export const sendCode = function(email) {
  return function(dispatch) {
    dispatch({ type: SEND_CODE_LOADING });

    return authApi.sendCode(email)
      .then(function(res) {
        dispatch({
          type: SEND_CODE_SUCCESS,
          payload: res,
        });
      })
      .catch(function(error) {
        dispatch({
          type: SEND_CODE_ERROR,
          payload: error.message,
        });
        console.log(error.message);
      });
  };
};


export const logout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT_REQUEST });
  const refreshToken = getState().authReducer.refreshToken;
  console.log(refreshToken);
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


export const register = (name, email, password) => (dispatch) => {
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

export const login = (email, password) => (dispatch) => {
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
<<<<<<< HEAD
=======
      console.log(res)
>>>>>>> main
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



export const setIsAuthChecked = (value) => ({
  type: SET_IS_AUTH_CHECKED,
  payload: value
})

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        })
        .finally(() => dispatch(setIsAuthChecked(true)))
    } else {
      dispatch(setIsAuthChecked(true))
    }
  }
}

