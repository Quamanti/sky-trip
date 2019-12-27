import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import {
  Button,
  TextField,
  Grid,
} from '@material-ui/core';

import { resetPassword as resPass } from '../../store/Users';
import { resetMessage as resMess } from '../../store/Application';
import { LoginMessage } from '../LoginMessage/LoginMessage';

const RecoverPasswordFormPure = ({ classes, resetPassword, resetMessage }) => {
  const onSubmit = (data) => {
    resetPassword(data);
  };

  const handleClick = () => {
    resetMessage();
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, values, submitting }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <LoginMessage />
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!values.email || submitting}
          >
            Reset
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" onClick={handleClick}>
                &larr; Back to Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
};

const mapDispatchToProps = ({
  resetPassword: resPass,
  resetMessage: resMess,
});

export const RecoverPasswordForm = connect(
  null,
  mapDispatchToProps,
)(RecoverPasswordFormPure);
