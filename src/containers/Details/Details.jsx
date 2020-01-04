import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { useHistory } from 'react-router';
import {
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  CardMedia,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import { getLocations, getPhotos } from '../../store/_selectors/data.selectors';
import { setEditDetails as setEditDets } from '../../store/Application';
import {
  deleteLocation as deleteLoc,
  fetchPhotos as FetchPhots,
  clearPhotos as clearPhots,
} from '../../store/Data';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  dataContainer: {
    padding: theme.spacing(1),
  },
  actionsContainer: {
    marginTop: theme.spacing(1),
    textAlign: 'right',
  },
  imagesContainer: {
    margin: theme.spacing(1),
  },
  cardMedia: {
    marginBottom: theme.spacing(1),
  },
}));

const DetailsPure = ({
  id,
  locations,
  photos,
  setEditDetails,
  deleteLocation,
  fetchPhotos,
  clearPhotos,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    fetchPhotos(id);

    return () => clearPhotos();
  }, [fetchPhotos, id, clearPhotos]);

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

  const handleDrawerClose = () => {
    history.push('/locations');
  };

  const renderData = (
    <div className={classes.dataContainer}>
      <Typography component="h1" variant="h6" color="primary" gutterBottom>
        {data.title}
      </Typography>
      <Typography component="p" variant="body2" gutterBottom>
        {data.description}
      </Typography>
    </div>
  );

  const renderActions = (
    <div className={classes.actionsContainer}>
      <Button
        color="primary"
        className={classes.button}
        startIcon={<ChevronLeftIcon />}
        onClick={handleDrawerClose}
      >
        Hide
      </Button>
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
  );

  const renderImages = (
    <div className={classes.imagesContainer}>
      {photos.map(photo => (
        <CardMedia
          key={photo.id}
          className={classes.cardMedia}
          component="img"
          alt={`Image ${photo.id}`}
          title={`Image ${photo.id}`}
          image={photo.file}
        />
      ))}
    </div>
  );

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
      {renderData}
      {renderActions}
      <Divider />
      {renderImages}
      {renderDialog}
    </div>
  );
};

const mapStateToProps = (store) => ({
  locations: getLocations(store),
  photos: getPhotos(store),
});

const mapDispatchToProps = ({
  setEditDetails: setEditDets,
  deleteLocation: deleteLoc,
  fetchPhotos: FetchPhots,
  clearPhotos: clearPhots,
});

export const Details = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsPure);
