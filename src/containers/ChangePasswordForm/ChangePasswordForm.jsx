import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { TextField, Button, Grid } from '@material-ui/core';

import { changePassword as changePass } from '../../store/Users';

const ChangePasswordFormPure = ({ changePassword }) => {
  const onSubmit = (data, form) => {
    changePassword(data);
    setTimeout(form.reset);
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, values, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <div>
                <Field name="password">
                  {props => (
                    <TextField
                      label="Old password"
                      type="password"
                      id="password"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>
              </div>
              <Field name="new_password">
                {props => (
                  <TextField
                    margin="dense"
                    label="New password"
                    type="password"
                    id="new_password"
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                  />
                )}
              </Field>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                size="small"
                color="primary"
                disabled={!values.password || !values.new_password || submitting}
              >
                Change password
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
};

const mapDispatchToProps = ({
  changePassword: changePass,
});

export const ChangePasswordForm = connect(
  null,
  mapDispatchToProps,
)(ChangePasswordFormPure);
