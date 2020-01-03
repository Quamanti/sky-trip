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
} from '../Data/actions';

import { setMessage, setEditDetails } from '../Application';
import { getCookies } from '../../utils/getCookies';

export const getLocationsEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(GET_LOCATIONS),
    mergeMap(() => ajax.get(
      '/user/locations/',
    ).pipe(
      map(({ response }) => getLocationsSuccess(response)),
      catchError(({ status }) => (
        of(
          status === 403 ? logout() : undefined,
          setMessage({
            message: status,
            error: true,
          }),
        )
      )),
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
      catchError(({ status }) => (
        of(
          status === 403 ? logout() : undefined,
          setMessage({
            message: status,
            error: true,
          }),
        )
      )),
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
      catchError(({ status }) => (
        of(
          status === 403 ? logout() : undefined,
          setMessage({
            message: status,
            error: true,
          }),
        )
      )),
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
          message: 'Location has been removed',
          error: false,
        }),
        fetchLocations(),
        push('/locations'),
      )),
      catchError(({ status }) => (
        of(
          status === 403 ? logout() : undefined,
          setMessage({
            message: status,
            error: true,
          }),
        )
      )),
    )),
  )
);

export const DataEpics = combineEpics(
  getLocationsEpic,
  postLocationEpic,
  patchLocationEpic,
  deleteLocationEpic,
);
