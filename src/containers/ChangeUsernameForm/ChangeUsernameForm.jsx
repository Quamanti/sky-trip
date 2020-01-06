import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Grid, TextField, Button } from '@material-ui/core';

import { changeUsername as changeName } from '../../store/Users';

const ChangeUsernameFormPure = ({ changeUsername }) => {
  const onSubmit = (data, form) => {
    changeUsername(data);
    setTimeout(form.reset);
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, values, submitting, form }) => (
        <form onSubmit={handleSubmit}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Field name="username">
                {props => (
                  <TextField
                    margin="dense"
                    label="New username"
                    id="username"
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
                disabled={!values.username || submitting}
              >
                Change username
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
};

const mapDispatchToProps = ({
  changeUsername: changeName,
});

export const ChangeUsernameForm = connect(
  null,
  mapDispatchToProps,
)(ChangeUsernameFormPure);
