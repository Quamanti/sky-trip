export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_DATA_RESULT = 'GET_USER_DATA_RESULT';
export const LOGOUT = 'LOGOUT';
export const UNAUTHORIZE = 'UNAUTHORIZE';
export const REGISTER = 'REGISTER';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';

export const authenticate = (payload) => ({
  type: AUTHENTICATE,
  payload,
});

export const authenticateSuccess = () => ({
  type: AUTHENTICATE_SUCCESS,
});

export const getUserData = () => ({
  type: GET_USER_DATA,
});

export const getUserDataResult = (payload) => ({
  type: GET_USER_DATA_RESULT,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});

export const unauthorize = () => ({
  type: UNAUTHORIZE,
});

export const register = (payload) => ({
  type: REGISTER,
  payload,
});

export const resetPassword = (payload) => ({
  type: RESET_PASSWORD,
  payload,
});

export const changePassword = (payload) => ({
  type: CHANGE_PASSWORD,
  payload,
});

export const changeUsername = (payload) => ({
  type: CHANGE_USERNAME,
  payload,
});

export const removeAccount = (payload) => ({
  type: REMOVE_ACCOUNT,
  payload,
});
