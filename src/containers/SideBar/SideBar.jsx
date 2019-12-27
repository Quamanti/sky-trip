import React from 'react';
import { connect } from 'react-redux';
import { Drawer, Divider, makeStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

import { isSideBarOpen } from '../../store/_selectors/application.selectors';

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

const SideBarPure = ({ open }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

const mapStateToProps = (store) => ({
  open: isSideBarOpen(store),
});

export const SideBar = connect(
  mapStateToProps,
  null,
)(SideBarPure);
