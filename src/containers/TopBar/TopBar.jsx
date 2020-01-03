import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HelpOutline from '@material-ui/icons/HelpOutline';
import ExploreIcon from '@material-ui/icons/Explore';

import { logout as logoff } from '../../store/Users';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
    color: '#846C5B',
  },
}));

export const TopBarPure = ({ logout, history }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialog, setDialog] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    setAnchorEl(null);
    history.push('/account');
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };

  const handleDialogOpenClick = () => {
    setDialog(true);
  };

  const handleDialogCloseClick = () => {
    setDialog(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMyAccount}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
  const renderInfo = (
    <Dialog
      open={dialog}
      onClose={handleDialogCloseClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">How to use</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          To add a location, click on chosen position on the map. Enter a title and (optionally) description then press SAVE.
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          To view location details, simply click on its marker. You can edit the details by pressing EDIT or you can delte the marker by pressing DELETE.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogCloseClick} color="primary">
          Hide
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <ExploreIcon className={classes.icon} />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            SKY TRIP
          </Typography>
          <IconButton
            onClick={handleDialogOpenClick}
            color="inherit"
          >
            <HelpOutline />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderInfo}
    </>
  );
};

const mapDispatchToProps = ({
  logout: logoff,
});

export const TopBar = connect(
  null,
  mapDispatchToProps,
)(withRouter(TopBarPure));
