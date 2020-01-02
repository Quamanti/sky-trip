import {
  GET_LOCATIONS_SUCCESS,
  SET_NEW_POINT,
} from './actions';

const initialState = ({
  locations: [],
  newPoint: null,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS_SUCCESS:
      return ({
        ...state,
        locations: action.payload,
      });
    case SET_NEW_POINT:
      return ({
        ...state,
        newPoint: action.payload,
      });
    default:
      return state;
  }
};
