export const SET_SIDE_BAR_STATE = 'SET_SIDE_BAR_STATE';
export const SET_MESSAGE = 'SET_MESSAGE';
export const RESET_MESSAGE = 'RESET_MESSAGE';

export const setSideBarState = (payload) => ({
  type: SET_SIDE_BAR_STATE,
  payload,
});

export const setMessage = (payload) => ({
  type: SET_MESSAGE,
  payload,
});

export const resetMessage = () => ({
  type: RESET_MESSAGE,
});
