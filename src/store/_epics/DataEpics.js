import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { of, forkJoin } from 'rxjs';
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
  DELETE_PHOTO,
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
    switchMap(
      ({ payload: { files, ...location } }) => ajax.post(
        '/user/locations/',
        location,
        {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookies().csrftoken,
        },
      ),
      (action, response) => ([action, response]),
    ),
    mergeMap(
      ([{ payload: { files } }, response]) => {
        const responses = files && files.map(file => {
          const data = new FormData();
          data.append('location', response.response.id);
          data.append('file', file);
          return ajax.post(
            '/photos/',
            data,
            {
              'X-CSRFToken': getCookies().csrftoken,
            },
          );
        });
        return files ? forkJoin(...responses) : forkJoin(of(response));
      },
    ),
    mergeMap(([{ response }]) => of(
      setMessage({
        message: 'Location has been added',
        error: false,
      }),
      fetchLocations(),
      setNewPoint(null),
      setEditDetails(false),
      push(`/locations/${response.location || response.id}`),
    )),
    catchError(handleError),
  )
);

export const patchLocationEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(PATCHT_LOCATION),
    switchMap(
      ({ payload: { files, filesToRemove, ...location } }) => ajax.patch(
        `/user/locations/${location.id}/`,
        location,
        {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookies().csrftoken,
        },
      ),
      (action, response) => ([action, response]),
    ),
    switchMap(
      ([action, response]) => {
        if (action.payload.filesToRemove) {
          const responses = action.payload.filesToRemove.map(fileId => (
            ajax.delete(
              `/photos/${fileId}/`,
              {
                'X-CSRFToken': getCookies().csrftoken,
              },
            )
          ));
          return forkJoin(...responses);
        }
        return forkJoin(of(response));
      },
      (action, response) => ([action[0], response]),
    ),
    switchMap(
      ([action, response]) => {
        if (action.payload.files) {
          const responses = action.payload.files && action.payload.files.map(file => {
            const data = new FormData();
            data.append('location', action.payload.id);
            data.append('file', file);
            return ajax.post(
              '/photos/',
              data,
              {
                'X-CSRFToken': getCookies().csrftoken,
              },
            );
          });
          return forkJoin(...responses);
        }
        return forkJoin(of(response));
      },
      (action, response) => ([action[0], response]),
    ),
    mergeMap(() => of(
      setMessage({
        message: 'Location has been updated',
        error: false,
      }),
      fetchLocations(),
      setEditDetails(false),
    )),
    catchError(handleError),
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

export const deletePhotoEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(DELETE_PHOTO),
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

export const DataEpics = combineEpics(
  getLocationsEpic,
  postLocationEpic,
  patchLocationEpic,
  deleteLocationEpic,
);
