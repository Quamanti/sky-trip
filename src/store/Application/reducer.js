import {
  SET_SIDE_BAR_STATE,
  SET_MESSAGE,
  RESET_MESSAGE,
} from './actions';

const initialState = ({
  sideBarOpen: false,
  message: '',
  error: false,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIDE_BAR_STATE:
      return ({
        ...state,
        sideBarOpen: action.payload,
      });
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
