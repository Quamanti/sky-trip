export const SET_MESSAGE = 'SET_MESSAGE';
export const RESET_MESSAGE = 'RESET_MESSAGE';

export const setMessage = (payload) => ({
  type: SET_MESSAGE,
  payload,
});

export const resetMessage = () => ({
  type: RESET_MESSAGE,
});
