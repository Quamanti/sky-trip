import {
  AUTHENTICATE_SUCCESS,
  GET_USER_DATA_RESULT,
  UNAUTHORIZE,
} from './actions';

const initialState = ({
  isAuthenticated: false,
  firstName: '',
  lastName: '',
  username: '',
  email: '',
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return ({
        ...state,
        isAuthenticated: true,
      });
    case GET_USER_DATA_RESULT:
      return ({
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        username: action.payload.username,
        email: action.payload.email,
      });
    case UNAUTHORIZE:
      return ({
        ...initialState,
      });
    default:
      return state;
  }
};
