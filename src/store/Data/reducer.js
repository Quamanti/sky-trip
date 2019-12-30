import {
  GET_LOCATIONS_SUCCESS,
} from './actions';

const initialState = ({
  locations: [
    {
      id: 1,
      title: 'Aa',
      description: 'Dlugie aaa',
      longitude: 50.28862,
      latitude: 18.677442,
    },
    {
      id: 2,
      title: 'Bb',
      description: 'Dlugie bbb',
      longitude: 50.284,
      latitude: 18.674,
    },
  ],
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
