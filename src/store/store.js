import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { rootReducer } from './rootReducer';
import { rootEpic, epicMiddleware } from './rootEpic';
import { getCookies } from '../utils/getCookies';

export const history = createBrowserHistory();

export const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistentState = {
    Users: { isAuthenticated: !!getCookies().sessionid },
  };

  const store = createStore(
    rootReducer(history),
    persistentState,
    compose(
      composeEnhancers(
        applyMiddleware(
          routerMiddleware(history),
          epicMiddleware,
        ),
      ),
    ),
  );

  epicMiddleware.run(rootEpic);

  return store;
};
