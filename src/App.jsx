import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme/mainTheme';

import store, { history } from './store';
import { Routes } from './routes';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Router history={history}>
          {Routes}
        </Router>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
