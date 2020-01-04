import {
  GET_LOCATIONS_SUCCESS,
  SET_NEW_POINT,
  GET_PHOTOS_SUCCESS,
  CLEAR_PHOTOS,
} from './actions';

const initialState = ({
  locations: [],
  newPoint: null,
  photos: [],
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
    // TODO: Remove
    case GET_PHOTOS_SUCCESS:
      return ({
        ...state,
        photos: action.payload,
      });
    case CLEAR_PHOTOS:
      return ({
        ...state,
        photos: [],
      });
    default:
      return state;
  }
};
