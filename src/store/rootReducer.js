import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Users from './Users';
import Application from './Application';
import Data from './Data';

const reducers = ({
  Users,
  Application,
  Data,
});

export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ...reducers,
});
