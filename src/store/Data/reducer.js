import {
  GET_LOCATIONS_SUCCESS,
} from './actions';

const initialState = ({
  locations: [],
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS_SUCCESS:
      return ({
        ...state,
        locations: action.payload,
      });
    default:
      return state;
  }
};
