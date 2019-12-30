import {
  SET_MESSAGE,
  RESET_MESSAGE,
} from './actions';

const initialState = ({
  message: '',
  error: false,
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
    default:
      return state;
  }
};
