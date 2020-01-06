import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import {
  Button,
  TextField,
} from '@material-ui/core';

import { authenticate as auth } from '../../store/Users';
import { resetMessage as resMess } from '../../store/Application';
import { LoginMessage } from '../LoginMessage/LoginMessage';

const LoginFormPure = ({ classes, authenticate, resetMessage }) => {
  const onSubmit = (data) => {
    resetMessage();
    authenticate(data);
  };

  const handleClick = () => {
    resetMessage();
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, values, submitting }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <LoginMessage />
          <Field name="username">
            {props => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                autoComplete="username"
                name={props.input.name}
                value={props.input.value}
                onChange={props.input.onChange}
              />
            )}
          </Field>
          <Field name="password">
            {props => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                name={props.input.name}
                value={props.input.value}
                onChange={props.input.onChange}
              />
            )}
          </Field>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!values.username || !values.password || submitting}
          >
            Sign In
          </Button>
          <Link to="/register" onClick={handleClick}>
            Don&apos;t have an account? Sign Up
          </Link>
        </form>
      )}
    </Form>
  );
};

const mapDispatchToProps = ({
  authenticate: auth,
  resetMessage: resMess,
});

export const LoginForm = connect(
  null,
  mapDispatchToProps,
)(LoginFormPure);
