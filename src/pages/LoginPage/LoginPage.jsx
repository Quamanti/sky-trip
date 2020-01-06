import React from 'react';
import {
  Avatar,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import { LoginForm } from '../../containers/LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(login-image.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const LoginPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ExploreOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm classes={classes} />
      </div>
    </Container>
  );
};
