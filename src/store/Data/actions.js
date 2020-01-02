export const SET_NEW_POINT = 'SET_NEW_POINT';
export const GET_LOCATIONS = 'GET_LOCATIONS';
export const GET_LOCATIONS_SUCCESS = 'GET_LOCATIONS_SUCCESS';
export const POST_LOCATION = 'POST_LOCATION';
export const PUT_LOCATION = 'PUT_LOCATION';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';

export const setNewPoint = (payload) => ({
  type: SET_NEW_POINT,
  payload,
});

export const fetchLocations = () => ({
  type: GET_LOCATIONS,
});

export const getLocationsSuccess = (payload) => ({
  type: GET_LOCATIONS_SUCCESS,
  payload,
});

export const postLocation = (payload) => ({
  type: POST_LOCATION,
  payload,
});

export const putLocation = (payload) => ({
  type: PUT_LOCATION,
  payload,
});

export const removeLocation = (payload) => ({
  type: REMOVE_LOCATION,
  payload,
});
