import React from 'react';
import { Route, Switch } from 'react-router';

import { ProtectedRoute } from './ProtectedRoute';

// Layouts
import { LoginLayout } from '../layouts/LoginLayout';
import { MainLayout } from '../layouts/MainLayout/MainLayout';

// Root components
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { RecoverPasswordPage } from '../pages/RecoverPasswordPage';
import { AccountPage } from '../pages/AccountPage';

export const makeIndexRoutes = () => (
  <MainLayout>
    <Switch>
      <ProtectedRoute exact path="/" component={() => <div>Hello world!</div>} />
      <ProtectedRoute exact path="/account" component={AccountPage} />
    </Switch>
  </MainLayout>
);

export const makeLoginRoutes = () => (
  <LoginLayout>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/recover" component={RecoverPasswordPage} />
    </Switch>
  </LoginLayout>
);

export const Routes = (
  <Switch>
    <Route exact path="/login" component={makeLoginRoutes} />
    <Route exact path="/register" component={makeLoginRoutes} />
    <Route exact path="/recover" component={makeLoginRoutes} />
    <ProtectedRoute path="/" component={makeIndexRoutes} />
  </Switch>
);
