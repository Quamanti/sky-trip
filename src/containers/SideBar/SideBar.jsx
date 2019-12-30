import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { find } from 'lodash';
import {
  Drawer,
  Divider,
  makeStyles,
} from '@material-ui/core';

import { Details } from '../Details';

export const SIDE_BAR_WIDTH = 320;

const useStyles = makeStyles(theme => ({
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: SIDE_BAR_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  toolbar: theme.mixins.toolbar,
}));

const SideBarPure = () => {
  const classes = useStyles();
  const id = Number(useParams().id);
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={!!id}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      {Number.isNaN(id) ? null : <Details id={id} />}
      <Divider />
    </Drawer>
  );
};

export const SideBar = connect(
  null,
  null,
)(SideBarPure);
