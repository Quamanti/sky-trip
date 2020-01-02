import React from 'react';
import { Icon } from 'leaflet';
import {
  Marker as LeafletMarker,
  Tooltip,
} from 'react-leaflet';

const defaultIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  tooltipAnchor: [0, -30],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const activeIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  tooltipAnchor: [0, -30],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export const Marker = ({ location, onClick, active }) => (
  <LeafletMarker
    key={location.id}
    id={location.id}
    position={[location.latitude, location.longitude]}
    onClick={onClick}
    icon={active ? activeIcon : defaultIcon}
  >
    <Tooltip direction="top">
      {location.title}
    </Tooltip>
  </LeafletMarker>
);
