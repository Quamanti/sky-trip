import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { green, amber } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';

import { getMessage } from '../../store/_selectors/application.selectors';
import { resetMessage as resMess } from '../../store/Application';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const CustomSnackbar = ({ message, onClose, variant }) => {
  const classes = useStyles();
  const Icon = variantIcon[variant];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!message.message}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={(
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message.message}
          </span>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

const MessagePure = ({ message, resetMessage }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    resetMessage();
  };

  return (
    <CustomSnackbar message={message} onClose={handleClose} variant={message.error ? 'error' : 'success'} />
  );
};

const mapStateToProps = (store) => ({
  message: getMessage(store),
});

const mapDispatchToProps = ({
  resetMessage: resMess,
});

export const Message = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagePure);
