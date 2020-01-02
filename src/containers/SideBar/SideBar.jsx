import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer,
  Divider,
  makeStyles,
} from '@material-ui/core';

import { Details } from '../Details';
import { EditDetails } from '../EditDetails';

import { getEditDetails } from '../../store/_selectors/application.selectors';

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

const SideBarPure = ({ editDetails }) => {
  const classes = useStyles();
  const { id } = useParams();

  const renderDrawerContent = () => {
    if (id === 'new') {
      return <EditDetails />;
    }

    if (!Number.isNaN(id)) {
      return editDetails ? <EditDetails id={Number(id)} /> : <Details id={Number(id)} />;
    }
    return undefined;
  };

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
      {renderDrawerContent()}
      <Divider />
    </Drawer>
  );
};

const mapStateToProps = (store) => ({
  editDetails: getEditDetails(store),
});

export const SideBar = connect(
  mapStateToProps,
)(SideBarPure);
