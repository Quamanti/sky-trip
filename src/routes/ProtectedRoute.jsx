import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { isAuthenticated as isAuth } from '../store/_selectors/user.selectors';

export const ProtectedRoutePure = (props) => {
  const { component, isAuthenticated, ...restProps } = props;

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...restProps} component={component} />;
};

const mapStateToProps = (store) => ({
  isAuthenticated: isAuth(store),
});

export const ProtectedRoute = connect(
  mapStateToProps,
)(ProtectedRoutePure);
