export const GET_LOCATIONS = 'GET_LOCATIONS';
export const GET_LOCATIONS_SUCCESS = 'GET_LOCATIONS_SUCCESS';

export const getLocations = () => ({
  type: GET_LOCATIONS,
});

export const getLocationsSuccess = (payload) => ({
  type: GET_LOCATIONS_SUCCESS,
  payload,
});
