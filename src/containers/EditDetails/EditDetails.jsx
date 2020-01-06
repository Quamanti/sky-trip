import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { find, isEmpty, last } from 'lodash';
import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  TextField,
  Button,
  Divider,
  IconButton,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import ClearIcon from '@material-ui/icons/Clear';

import { Dropzone } from '../../components/Dropzone';

import { getLocations, getNewPoint } from '../../store/_selectors/data.selectors';
import { postLocation as postLoc, patchLocation as patchLoc } from '../../store/Data';
import { setEditDetails as setEditDets } from '../../store/Application';


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
  imageItem: {
    listStyle: 'none',
  },
  removeButton: {
    width: '5px',
  },
}));

const EditDetailsPure = ({
  id,
  locations,
  newPoint,
  postLocation,
  patchLocation,
  setEditDetails,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [filesToRemove, setFilesToRemove] = useState([]);

  const data = find(locations, { id }) || {};

  useEffect(() => {
    if (isEmpty(data) && isEmpty(newPoint)) {
      history.push('/locations');
    }
  }, [data, newPoint, history]);

  const onSubmit = (formData) => {
    if (id === undefined) {
      postLocation({
        ...formData,
        longitude: newPoint.lng,
        latitude: newPoint.lat,
      });
    } else {
      patchLocation({
        ...formData,
        ...(filesToRemove.length ? { filesToRemove } : undefined),
        id,
      });
    }
  };

  const handleCancelClick = () => {
    if (id === undefined) {
      history.push('/locations');
    }
    setEditDetails(false);
  };

  const renderData = (
    <div className={classes.dataContainer}>
      <Field name="title">
        {props => (
          <TextField
            variant="standard"
            fullWidth
            id="title"
            label="Title"
            name={props.input.name}
            value={props.input.value}
            onChange={props.input.onChange}
            required
          />
        )}
      </Field>
      <Field name="description" initialValue="" parse={v => v}>
        {props => (
          <TextField
            multiline
            variant="standard"
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name={props.input.name}
            value={props.input.value}
            onChange={props.input.onChange}
          />
        )}
      </Field>
    </div>
  );

  const renderActions = (
    <div className={classes.actionsContainer}>
      <Button
        type="button"
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<CancelIcon />}
        onClick={handleCancelClick}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </div>
  );

  const handleRemoveFile = (photoId) => {
    setFilesToRemove([...filesToRemove, photoId]);
  };

  const filesList = data.photos && data.photos
    .filter(({ id: photoId }) => (filesToRemove.findIndex(fileId => fileId === photoId) === -1))
    .map(({ file, id: photoId }) => (
      <li key={photoId} className={classes.imageItem}>
        {last(file.split('/'))}
        <IconButton
          color="secondary"
          aria-label="remove file"
          size="small"
          onClick={() => handleRemoveFile(photoId)}
        >
          <ClearIcon />
        </IconButton>
      </li>
    ));

  const renderImages = (
    <div className={classes.imagesContainer}>
      <Field name="files" component={Dropzone} />
      <ul className={classes.imagesList}>{filesList}</ul>
    </div>
  );

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={{ title: data.title, description: data.description }}
      >
        {({ handleSubmit }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            {renderData}
            {renderActions}
            <Divider />
            {renderImages}
          </form>
        )}
      </Form>
    </div>
  );
};


const mapStateToProps = (store) => ({
  locations: getLocations(store),
  newPoint: getNewPoint(store),
});

const mapDispatchToProps = ({
  setEditDetails: setEditDets,
  postLocation: postLoc,
  patchLocation: patchLoc,
});

export const EditDetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDetailsPure);
