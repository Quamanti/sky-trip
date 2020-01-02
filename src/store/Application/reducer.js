import {
  SET_MESSAGE,
  RESET_MESSAGE,
  EDIT_DETAILS,
} from './actions';

const initialState = ({
  message: '',
  error: false,
  editDetails: false,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return ({
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      });
    case RESET_MESSAGE:
      return ({
        ...state,
        message: '',
        error: false,
      });
    case EDIT_DETAILS:
      return ({
        ...state,
        editDetails: action.payload,
      });
    default:
      return state;
  }
};
