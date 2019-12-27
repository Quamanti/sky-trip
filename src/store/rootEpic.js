import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';

import { UserEpics } from './_epics/UserEpics';

export const epicMiddleware = createEpicMiddleware({
  dependencies: { ajax },
});

export const rootEpic = combineEpics(UserEpics);
