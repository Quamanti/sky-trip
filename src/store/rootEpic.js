import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';

import { UserEpics } from './_epics/UserEpics';
import { DataEpics } from './_epics/DataEpics';

export const epicMiddleware = createEpicMiddleware({
  dependencies: { ajax },
});

export const rootEpic = combineEpics(UserEpics, DataEpics);
