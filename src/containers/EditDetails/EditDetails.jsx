import React from 'react';
import { connect } from 'react-redux';
import {
  makeStyles,
  TextField,
  Button,
} from '@material-ui/core';
import { find } from 'lodash';
import { Form, Field } from 'react-final-form';

import { getLocations, getNewPoint } from '../../store/_selectors/data.selectors';
import { postLocation as postLoc, putLocation as putLoc } from '../../store/Data';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
  },
}));

const EditDetailsPure = ({ id, locations, newPoint, postLocation, putLocation }) => {
  const classes = useStyles();
  const data = find(locations, { id }) || {};
  const onSubmit = (formData) => {
    if (id === undefined) {
      postLocation({
        ...formData,
        longitude: newPoint.lng,
        latitude: newPoint.lat,
      });
    } else {
      putLocation({
        ...formData,
        id,
        longitude: data.longitude,
        latitude: data.latitude,
      });
    }
  };

  return (
    <div className={classes.container}>
      <Form
        onSubmit={onSubmit}
        initialValues={{ title: data.title, description: data.description }}
      >
        {({ handleSubmit }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
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
                />
              )}
            </Field>
            <Field name="description">
              {props => (
                <TextField
                  multiline
                  variant="outlined"
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
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
  postLocation: postLoc,
  putLocation: putLoc,
});

export const EditDetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDetailsPure);
