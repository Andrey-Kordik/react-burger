import { authApi } from '../../components/utils/auth-api'

export const REGISTER_LOAD_SUCCESS = "REGISTER_LOAD_SUCCESS";
export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const LOGIN_LOAD_SUCCESS = "LOGIN_LOAD_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const GET_USER = "GET_USER";
export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED'
export const SET_USER = "SET_USER";
export const REFRESH_TOKEN = "REFRESH_TOKEN"
export const REFRESH_TOKEN_FAILURE = "REFRESH_TOKEN_FAILURE"
export const LOGOUT_REQUEST = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILURE = "LOGOUT_FAILURE"

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  return authApi.logout()
    .then(data => {
      if (data.success) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null)
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      } else {
        dispatch(logoutFailure(data.message));
      }
    })
    .catch(error => {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: error.message,
      });
    });
};

export const refreshToken = (refreshToken, accessToken) => (dispatch) => {
  dispatch({ type: REFRESH_TOKEN });
  return authApi.fetchWithRefresh(url, options)
    .then(res => {
      dispatch({
        type: REFRESH_TOKEN,
        payload: {
          refreshToken,
          accessToken,
        },
      });
    })
    .catch(error => {
      dispatch({ type: REFRESH_TOKEN_FAILURE, payload: error });
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

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});



export const getUser = () => {
  return (dispatch) => {
    return authApi.getUserData().then((res) => {
      console.log(res)
      dispatch(setUser(res.user));
    });
  };
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