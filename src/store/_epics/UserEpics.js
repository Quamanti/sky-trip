import { mergeMap, map, endWith, catchError } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { push } from 'connected-react-router';
import { of } from 'rxjs';

import {
  AUTHENTICATE,
  authenticateSuccess,
  GET_USER_DATA,
  getUserDataResult,
  LOGOUT,
  unauthorize,
  REGISTER,
  CHANGE_PASSWORD,
  CHANGE_USERNAME,
  REMOVE_ACCOUNT,
  logout,
} from '../Users/actions';
import {
  setMessage,
  resetMessage,
} from '../Application/actions';

import { getCookies, deleteCookie } from '../../utils/getCookies';

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
  if (status === 404) {
    return of(
      setMessage({
        message: 'Invalid username or password',
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

export const authEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(AUTHENTICATE),
    mergeMap(action => ajax.post(
      '/login/',
      action.payload,
      { 'Content-Type': 'application/json' },
    ).pipe(
      mergeMap(() => of(
        authenticateSuccess(),
        resetMessage(),
      )),
      endWith(push('/')),
      catchError(handleError),
    )),
  )
);

export const userDataEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(GET_USER_DATA),
    mergeMap(() => ajax.get(
      '/user/',
    ).pipe(
      map(({ response }) => (
        getUserDataResult({
          firstName: response.first_name,
          lastName: response.last_name,
          username: response.username,
          email: response.email,
        })
      )),
      catchError(({ response }) => (
        of(setMessage({
          message: response.message,
          error: true,
        }))
      )),
    )),
  )
);

export const logoutEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(LOGOUT),
    mergeMap(() => ajax.post(
      '/logout/',
      {},
      { 'X-CSRFToken': getCookies().csrftoken },
    ).pipe(
      map(() => unauthorize()),
      catchError(() => {
        deleteCookie('sessionid');
        return of(unauthorize());
      }),
    )),
  )
);

export const regEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(REGISTER),
    mergeMap(action => ajax.post(
      'user/register/',
      action.payload,
      { 'Content-Type': 'application/json' },
    ).pipe(
      map(() => (
        setMessage({
          message: 'Registration successful.',
          error: false,
        })
      )),
      endWith(push('/login')),
      catchError(({ status, response }) => {
        if (status === 400) {
          return of(setMessage({
            message: response[Object.keys(response)[0]],
            error: true,
          }));
        }
        return of(setMessage({
          message: 'Something went wrong.',
          error: true,
        }));
      }),
    )),
  )
);

export const changePassEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(CHANGE_PASSWORD),
    mergeMap(action => ajax.post(
      '/SkyNoteServer/api/1.0/users/changePassword',
      action.payload,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    ).pipe(
      map(({ response }) => (
        setMessage({
          message: response.message,
          error: false,
        })
      )),
      catchError(({ response }) => (
        of(setMessage({
          message: response.message,
          error: true,
        }))
      )),
    )),
  )
);

export const changeUserEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(CHANGE_USERNAME),
    mergeMap(action => ajax.patch(
      '/user/',
      action.payload,
      {
        'X-CSRFToken': getCookies().csrftoken,
        'Content-Type': 'application/json',
      },
    ).pipe(
      mergeMap(({ response }) => (of(
        setMessage({
          message: 'Username has been changed',
          error: false,
        }),
        getUserDataResult({
          firstName: response.first_name,
          lastName: response.last_name,
          username: response.username,
          email: response.email,
        }),
      )
      )),
      catchError(({ status }) => {
        if (status === 400) {
          return of(setMessage({
            message: 'A user with that username already exists',
            error: true,
          }));
        }
        return of(setMessage({
          message: 'Something went wrong.',
          error: true,
        }));
      }),
    )),
  )
);

export const removeAccEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(REMOVE_ACCOUNT),
    mergeMap(action => ajax.post(
      '/SkyNoteServer/api/1.0/users/delete',
      action.payload,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    ).pipe(
      map(({ response }) => (
        setMessage({
          message: response.message,
          error: false,
        })
      )),
      endWith(push('/login')),
      catchError(({ response }) => (
        of(setMessage({
          message: response.message,
          error: true,
        }))
      )),
    )),
  )
);

export const UserEpics = combineEpics(
  authEpic,
  userDataEpic,
  logoutEpic,
  regEpic,
  // changePassEpic,
  changeUserEpic,
  // removeAccEpic,
);
