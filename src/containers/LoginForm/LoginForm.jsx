import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
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
          <Field name="login_email">
            {props => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Username"
                autoComplete="email"
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
          <Field name="remember" type="checkbox" initialValue={false}>
            {props => (
              <FormControlLabel
                control={(
                  <Checkbox
                    color="primary"
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                  />
                )}
                label="Remember me"
              />
            )}
          </Field>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!values.login_email || !values.password || submitting}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/recover" onClick={handleClick}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" onClick={handleClick}>
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
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
