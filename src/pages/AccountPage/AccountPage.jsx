import React from 'react';
import {
  makeStyles,
  Container,
  Paper,
  List,
  Divider,
  ListItem,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { UserData } from '../../containers/UserData/UserData';
import { DeleteAccountForm } from '../../containers/DeleteAccountForm/DeleteAccount';
import { ChangePasswordForm } from '../../containers/ChangePasswordForm/ChangePasswordForm';
import { ChangeUsernameForm } from '../../containers/ChangeUsernameForm/ChangeUsernameForm';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export const AccountPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={classes.paper}>
        <Link to="/locations">
          &larr; Back to main page
        </Link>
        <UserData />
        <List>
          <Divider component="li" />
          <ListItem>
            <div style={{ width: '100%' }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Change username
              </Typography>
              <ChangeUsernameForm />
            </div>
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <div style={{ width: '100%' }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Change password
              </Typography>
              <ChangePasswordForm />
            </div>
          </ListItem>
          <Divider component="li" />
          <ListItem alignItems="center">
            <div style={{ width: '100%' }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Delete account
              </Typography>
              <DeleteAccountForm />
            </div>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};
