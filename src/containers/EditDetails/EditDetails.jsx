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
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import { Dropzone } from '../../components/Dropzone';

import { getLocations, getNewPoint } from '../../store/_selectors/data.selectors';
import { postLocation as postLoc, patchLocation as patchLoc } from '../../store/Data';
import { setEditDetails as setEditDets } from '../../store/Application';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    padding: theme.spacing(1),
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

  const renderDetails = (
    <>
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
    </>
  );

  const renderActions = (
    <>
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
    </>
  );

  const handleRemoveFile = (photoId) => {
    setFilesToRemove([...filesToRemove, photoId]);
    data.photos.splice(data.photos.findIndex(photo => photo.id === photoId), 1);
  };

  const filesList = data.photos && data.photos.map(({ file, id: photoId }) => (
    <li key={photoId}>
      {last(file.split('/'))}
      <button type="button" onClick={() => handleRemoveFile(photoId)}>Remove File</button>
    </li>
  ));

  return (
    <div className={classes.container}>
      <Form
        onSubmit={onSubmit}
        initialValues={{ title: data.title, description: data.description }}
      >
        {({ handleSubmit }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            {renderDetails}
            {renderActions}
            <Divider />
            <Field name="files" component={Dropzone} />
            <ul>{filesList}</ul>
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
