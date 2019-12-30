import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    flexShrink: 0,
    height: '100vh',
    overflow: 'auto',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export const Content = ({ children }) => {
  const classes = useStyles();

  return (
    <main
      className={classes.content}
    >
      <div className={classes.drawerHeader} />
      {children}
    </main>
  );
};
