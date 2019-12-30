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
      '/',
    ).pipe(
      map(({ response }) => getLocationsSuccess({
        locations: response, // TODO
      })),
      catchError(({ response }) => (
        of(setMessage({
          message: response.message,
          error: true,
        }))
      )),
    )),
  )
);

export const DataEpics = combineEpics(
  getLocationsEpic,
);
