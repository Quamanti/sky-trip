import React from 'react';
import { connect } from 'react-redux';
import {
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { find } from 'lodash';

import { getLocations } from '../../store/_selectors/data.selectors';
import { setEditDetails as setEditDets } from '../../store/Application';
import { removeLocation as removeLoc } from '../../store/Data';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    padding: theme.spacing(1),
  },
}));

const DetailsPure = ({ id, locations, setEditDetails, removeLocation }) => {
  const classes = useStyles();
  const data = find(locations, { id }) || {};

  const handleEditClick = () => {
    setEditDetails(true);
  };

  const handleRemoveClick = () => {
    removeLocation(id);
  };

  return (
    <div className={classes.container}>
      <Typography component="h1" variant="h6" color="primary" gutterBottom>
        {data.title}
      </Typography>
      <Typography component="p" variant="body2" gutterBottom>
        {data.description}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={handleRemoveClick}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<EditIcon />}
        onClick={handleEditClick}
      >
        Edit
      </Button>
    </div>
  );
};

const mapStateToProps = (store) => ({
  locations: getLocations(store),
});

const mapDispatchToProps = ({
  setEditDetails: setEditDets,
  removeLocation: removeLoc,
});

export const Details = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsPure);
