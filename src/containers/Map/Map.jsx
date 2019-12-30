import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Tooltip,
} from 'react-leaflet';

import { getLocations as getLocs } from '../../store/Data/actions';

const locations = [
  {
    id: 1,
    title: 'Aa',
    description: 'Dlugie aaa',
    longitude: 50.28862,
    latitude: 18.677442,
  },
  {
    id: 2,
    title: 'Bb',
    description: 'Dlugie bbb',
    longitude: 50.284,
    latitude: 18.674,
  },
];

const MapPure = ({ getLocations }) => {
  const [mapHeight, changeMapHeight] = useState(window.innerHeight - 64);
  const [newPoint, setNewPoint] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const resize = () => changeMapHeight(window.innerHeight - 64);
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  const handleMapClick = e => {
    setNewPoint(e.latlng);
  };

  const handleMarkerClick = (data) => {
    history.push(`/locations/${data.target.options.id}`);
  };

  return (
    <LeafletMap
      style={{ height: `${mapHeight}px`, width: '100%' }}
      zoom={3}
      maxZoom={19}
      minZoom={3}
      center={[50.289, 18.677]}
      onClick={handleMapClick}
      zoomControl={false}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => {
        return (
          <Marker
            key={location.id}
            id={location.id}
            position={[location.longitude, location.latitude]}
            onClick={handleMarkerClick}
          >
            <Tooltip direction="top">
              {location.title}
            </Tooltip>
          </Marker>
        );
      })}

      {newPoint && <Marker position={newPoint} onClick={() => setNewPoint(null)}></Marker>}
      <ZoomControl position="bottomright" />
    </LeafletMap>
  );
};

const mapDispatchToProps = ({
  getLocations: getLocs,
});

export const Map = connect(
  null,
  mapDispatchToProps,
)(MapPure);
