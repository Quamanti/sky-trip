export const SET_MESSAGE = 'SET_MESSAGE';
export const RESET_MESSAGE = 'RESET_MESSAGE';
export const EDIT_DETAILS = 'EDIT_DETAILS';

export const setMessage = (payload) => ({
  type: SET_MESSAGE,
  payload,
});

export const resetMessage = () => ({
  type: RESET_MESSAGE,
});

export const setEditDetails = (payload) => ({
  type: EDIT_DETAILS,
  payload,
});
