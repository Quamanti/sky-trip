import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Typography, Checkbox, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@material-ui/core';
import { Form, Field } from 'react-final-form';

import { removeAccount as removeAcc } from '../../store/Users';

const DeleteAccountPureForm = ({ removeAccount }) => {
  const [checked, setCheckbox] = useState(false);
  const [open, setDialog] = useState(false);

  const handleCheckboxClick = (e) => {
    setCheckbox(e.target.checked);
  };

  const handleButtonClick = () => {
    setDialog(true);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  const onSubmit = (data) => {
    removeAccount(data);
    setDialog(false);
  };

  return (
    <Grid container justify="space-between">
      <Grid item>
        <Typography display="inline" color="textPrimary">
          I want to close my account (data couldn&apos;t be restored) and
        </Typography>
        <Checkbox checked={checked} onClick={handleCheckboxClick} />
        <Typography display="inline" color={checked ? 'secondary' : 'textSecondary'}>
          I&apos;m definitely sure of that.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          disabled={!checked}
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleButtonClick}
        >
          Delete account
        </Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Confirm by your password</DialogTitle>
        <Form onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Field name="password">
                  {props => (
                    <TextField
                      // margin="small"
                      label="Password"
                      type="password"
                      id="password"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="secondary">
                  Confirm
                </Button>
              </DialogActions>
            </form>
          )}
        </Form>
      </Dialog>
    </Grid>
  );
};

const mapDispatchToProps = ({
  removeAccount: removeAcc,
});

export const DeleteAccountForm = connect(
  null,
  mapDispatchToProps,
)(DeleteAccountPureForm);
