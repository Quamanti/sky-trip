import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { find, isEmpty, last } from 'lodash';
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


import { getLocations } from '../../store/_selectors/data.selectors';
import { setEditDetails as setEditDets } from '../../store/Application';
import { deleteLocation as deleteLoc } from '../../store/Data';

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
    cursor: 'pointer',
  },
}));

const DetailsPure = ({
  id,
  locations,
  setEditDetails,
  deleteLocation,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [image, setImage] = useState('');

  const data = find(locations, { id }) || {};

  useEffect(() => {
    if (isEmpty(locations)) {
      history.push('/locations');
    }
  }, [locations, history]);

  const handleEditClick = () => {
    setEditDetails(true);
  };

  const handleDialogOpenClick = () => {
    setDeleteDialog(true);
  };

  const handleDialogCloseClick = () => {
    setDeleteDialog(false);
  };

  const handleRemoveClick = () => {
    deleteLocation(id);
  };

  const handleDrawerClose = () => {
    history.push('/locations');
  };

  const handleImageDialogOpen = (file) => {
    setImage(file);
  };

  const handleImageDialogClose = () => {
    setImage('');
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
      {data.photos && data.photos.map(({ file, id: photoId }) => (
        <CardMedia
          key={photoId}
          className={classes.cardMedia}
          component="img"
          alt={last(file.split('/'))}
          title={last(file.split('/'))}
          image={file}
          onClick={() => handleImageDialogOpen(file)}
        />
      ))}
    </div>
  );

  const renderImageDialog = (
    <Dialog
      open={!!image}
      onClose={handleImageDialogClose}
      maxWidth="lg"
    >
      <CardMedia
        component="img"
        alt={last(image.split('/'))}
        title={last(image.split('/'))}
        image={image}
        onClick={handleImageDialogClose}
      />
    </Dialog>
  );

  const renderDeleteDialog = (
    <Dialog
      open={deleteDialog}
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
    <div>
      {renderData}
      {renderActions}
      <Divider />
      {renderImages}
      {renderDeleteDialog}
      {renderImageDialog}
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
