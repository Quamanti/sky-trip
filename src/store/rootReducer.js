import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Users from './Users';
import Application from './Application';

const reducers = ({
  Users,
  Application,
});

export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ...reducers,
});
