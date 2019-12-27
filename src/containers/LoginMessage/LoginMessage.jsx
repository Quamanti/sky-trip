import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

import { getMessage } from '../../store/_selectors/application.selectors';

const useStyles = makeStyles({
  root: {
    fontStyle: 'italic',
    fontWeight: 300,
    width: '100%',
    color: green[800],
    backgroundColor: green[50],
  },
  colorError: {
    color: red[800],
    backgroundColor: red[50],
  },
});

const LoginMessagePure = ({ message }) => {
  const classes = useStyles();
  return (
    <Typography
      align="center"
      classes={{
        root: classes.root,
        colorError: classes.colorError,
      }}
      color={message.error ? 'error' : undefined}
    >
      {message.message}
    </Typography>
  );
};

const mapStateToProps = (store) => ({
  message: getMessage(store),
});

export const LoginMessage = connect(
  mapStateToProps,
)(LoginMessagePure);
