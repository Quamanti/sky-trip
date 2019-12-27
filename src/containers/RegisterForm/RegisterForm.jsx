import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import {
  Button,
  TextField,
  Grid,
} from '@material-ui/core';

import { register as reg } from '../../store/Users';
import { resetMessage as resMess } from '../../store/Application';
import { LoginMessage } from '../LoginMessage/LoginMessage';

const RegisterFormPure = ({ classes, register, resetMessage }) => {
  const onSubmit = (data) => {
    register(data);
  };

  const handleClick = () => {
    resetMessage();
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, values, submitting }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LoginMessage />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="first_name">
                {props => (
                  <TextField
                    autoFocus
                    variant="outlined"
                    fullWidth
                    id="first_name"
                    label="First Name"
                    autoComplete="fname"
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="last_name">
                {props => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    autoComplete="lname"
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                  />
                )}
              </Field>
            </Grid>
          </Grid>
          <Field name="username">
            {props => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name={props.input.name}
                value={props.input.value}
                onChange={props.input.onChange}
              />
            )}
          </Field>
          <Field name="email">
            {props => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
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
                id="password"
                label="Password"
                type="password"
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
            disabled={
              !values.name
              || !values.surname
              || !values.login
              || !values.email
              || !values.password
              || submitting
            }
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" onClick={handleClick}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
};

const mapDispatchToProps = ({
  register: reg,
  resetMessage: resMess,
});

export const RegisterForm = connect(
  null,
  mapDispatchToProps,
)(RegisterFormPure);
