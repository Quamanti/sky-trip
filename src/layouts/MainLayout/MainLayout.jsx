import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';

import { TopBar } from '../../containers/TopBar';
import { SideBar } from '../../containers/SideBar/SideBar';
import { Content } from '../../containers/Content/Content';
import { Message } from '../../containers/Message/Message';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

export const MainLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      <SideBar />
      <Content>
        {children}
      </Content>
      <Message />
    </div>
  );
};
