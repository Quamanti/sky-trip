import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { push } from 'connected-react-router';

import { logout } from '../Users/actions';
import {
  setNewPoint,
  fetchLocations,
  GET_LOCATIONS,
  getLocationsSuccess,
  POST_LOCATION,
  PATCHT_LOCATION,
  DELETE_LOCATION,
  GET_PHOTOS,
  getPhotosSuccess,
} from '../Data/actions';

import { setMessage, setEditDetails } from '../Application';
import { getCookies } from '../../utils/getCookies';

const handleError = ({ status }) => {
  if (status === 400) {
    return of(
      setMessage({
        message: 'Invalid data provided',
        error: true,
      }),
    );
  }
  if (status === 403) {
    return of(
      logout(),
      setMessage({
        message: 'Authentication failure',
        error: true,
      }),
    );
  }
  return of(
    setMessage({
      message: 'Something went wrong',
      error: true,
    }),
  );
};

export const getLocationsEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(GET_LOCATIONS),
    mergeMap(() => ajax.get(
      '/user/locations/',
    ).pipe(
      map(({ response }) => getLocationsSuccess(response)),
      catchError(handleError),
    )),
  )
);

export const postLocationEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(POST_LOCATION),
    mergeMap(({ payload }) => ajax.post(
      '/user/locations/',
      payload,
      {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookies().csrftoken,
      },
    ).pipe(
      mergeMap(({ response }) => of(
        setMessage({
          message: 'Location has been added',
          error: false,
        }),
        fetchLocations(),
        setNewPoint(null),
        setEditDetails(false),
        push(`/locations/${response.id}`),
      )),
      catchError(handleError),
    )),
  )
);

export const patchLocationEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(PATCHT_LOCATION),
    mergeMap(({ payload }) => ajax.patch(
      `/user/locations/${payload.id}/`,
      payload,
      {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookies().csrftoken,
      },
    ).pipe(
      mergeMap(() => of(
        setMessage({
          message: 'Location has been updated',
          error: false,
        }),
        fetchLocations(),
        setEditDetails(false),
      )),
      catchError(handleError),
    )),
  )
);

export const deleteLocationEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(DELETE_LOCATION),
    mergeMap(({ payload }) => ajax.delete(
      `/user/locations/${payload}/`,
      {
        'X-CSRFToken': getCookies().csrftoken,
      },
    ).pipe(
      mergeMap(() => of(
        setMessage({
          message: 'Location has been deleted',
          error: false,
        }),
        fetchLocations(),
        push('/locations'),
      )),
      catchError(handleError),
    )),
  )
);

// TODO Remove
export const getPhotoEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(GET_PHOTOS),
    mergeMap(({ payload }) => ajax.get(
      `/user/locations/${payload}/photos`,
    ).pipe(
      map(({ response }) => getPhotosSuccess(response)),
      catchError(handleError),
    )),
  )
);

export const DataEpics = combineEpics(
  getLocationsEpic,
  postLocationEpic,
  patchLocationEpic,
  deleteLocationEpic,
  getPhotoEpic,
);
