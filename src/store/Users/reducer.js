import {
  AUTHENTICATE_SUCCESS,
  GET_USER_DATA_RESULT,
  UNAUTHORIZE,
} from './actions';

const initialState = ({
  isAuthenticated: false,
  name: '',
  surname: '',
  login: '',
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
        name: action.payload.name,
        surname: action.payload.surname,
        login: action.payload.login,
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
