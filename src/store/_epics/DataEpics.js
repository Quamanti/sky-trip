import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { of } from 'rxjs';

import {

} from '../Users/actions';
import {
  GET_LOCATIONS,
  getLocationsSuccess,
} from '../Data/actions';

import { setMessage } from '../Application';

export const getLocationsEpic = (action$, store$, { ajax }) => (
  action$.pipe(
    ofType(GET_LOCATIONS),
    mergeMap(() => ajax.get(
      '/user/locations/',
    ).pipe(
      map(({ response }) => getLocationsSuccess(response)),
      catchError(({ status }) => (
        of(setMessage({
          message: status,
          error: true,
        }))
      )),
    )),
  )
);

export const DataEpics = combineEpics(
  getLocationsEpic,
);
