import React from 'react';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import { find } from 'lodash';

import { getLocations } from '../../store/_selectors/data.selectors';

const DetailsPure = ({ id, locations }) => {
  const data = find(locations, { id }) || {};

  return (
    <List>
      {Object.keys(data).map((key) => (
        <ListItem button key={key}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary={key} secondary={data[key]} />
        </ListItem>
      ))}
    </List>
  );
};


const mapStateToProps = (store) => ({
  locations: getLocations(store),
});

export const Details = connect(
  mapStateToProps,
)(DetailsPure);
