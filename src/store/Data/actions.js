export const SET_NEW_POINT = 'SET_NEW_POINT';
export const GET_LOCATIONS = 'GET_LOCATIONS';
export const GET_LOCATIONS_SUCCESS = 'GET_LOCATIONS_SUCCESS';
export const POST_LOCATION = 'POST_LOCATION';
export const PATCHT_LOCATION = 'PATCHT_LOCATION';
export const DELETE_LOCATION = 'DELETE_LOCATION';

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

export const patchLocation = (payload) => ({
  type: PATCHT_LOCATION,
  payload,
});

export const deleteLocation = (payload) => ({
  type: DELETE_LOCATION,
  payload,
});
