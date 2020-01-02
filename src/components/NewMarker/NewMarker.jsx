import React from 'react';
import { Icon } from 'leaflet';
import {
  Marker as LeafletMarker,
} from 'react-leaflet';

const newIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  tooltipAnchor: [0, -30],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export const NewMarker = ({ position, onClick }) => (
  <LeafletMarker
    position={position}
    onClick={onClick}
    icon={newIcon}
  />
);
