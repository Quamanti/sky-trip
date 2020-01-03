import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { find } from 'lodash';

import { getLocations } from '../../store/_selectors/data.selectors';
import { setEditDetails as setEditDets } from '../../store/Application';
import { deleteLocation as deleteLoc } from '../../store/Data';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  dataContainer: {
    padding: theme.spacing(2),
  },
  actionsContainer: {
    marginTop: theme.spacing(1),
    textAlign: 'right',
  },
}));

const DetailsPure = ({ id, locations, setEditDetails, deleteLocation }) => {
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);

  const data = find(locations, { id }) || {};

  const handleEditClick = () => {
    setEditDetails(true);
  };

  const handleDialogOpenClick = () => {
    setDialog(true);
  };

  const handleDialogCloseClick = () => {
    setDialog(false);
  };

  const handleRemoveClick = () => {
    deleteLocation(id);
  };

  const renderDialog = (
    <Dialog
      open={dialog}
      onClose={handleDialogCloseClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure to delete location?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action will delete location data with all attached photos. 
          Deleted locations cannot be recovered.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogCloseClick} color="primary">
          Cancel
        </Button>
        <Button onClick={handleRemoveClick} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className={classes.container}>
      <div className={classes.dataContainer}>
        <Typography component="h1" variant="h6" color="primary" gutterBottom>
          {data.title}
        </Typography>
        <Typography component="p" variant="body2" gutterBottom>
          {data.description}
        </Typography>
      </div>
      <div className={classes.actionsContainer}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<EditIcon />}
          onClick={handleEditClick}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={handleDialogOpenClick}
        >
          Delete
        </Button>
      </div>
      {renderDialog}
    </div>
  );
};

const mapStateToProps = (store) => ({
  locations: getLocations(store),
});

const mapDispatchToProps = ({
  setEditDetails: setEditDets,
  deleteLocation: deleteLoc,
});

export const Details = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsPure);
