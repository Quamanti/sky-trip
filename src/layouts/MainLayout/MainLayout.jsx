import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';

import { Content } from '../../components/Content';
import { TopBar } from '../../containers/TopBar';
import { SideBar } from '../../containers/SideBar';
import { Message } from '../../containers/Message';

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
