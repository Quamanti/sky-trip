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

import { fetchLocations as fetchLocs } from '../../store/Data/actions';
import { getLocations } from '../../store/_selectors/data.selectors';

const MapPure = ({ fetchLocations, locations }) => {
  const [mapHeight, changeMapHeight] = useState(window.innerHeight - 64);
  const [newPoint, setNewPoint] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const resize = () => changeMapHeight(window.innerHeight - 64);
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleMapClick = (e) => {
    // setNewPoint(e.latlng);
    history.push('/locations');
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

const mapStateToProps = (store) => ({
  locations: getLocations(store),
});

const mapDispatchToProps = ({
  fetchLocations: fetchLocs,
});

export const Map = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapPure);
