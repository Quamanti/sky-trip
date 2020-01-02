import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
  Map as LeafletMap,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';

import { Marker } from '../../components/Marker';
import { NewMarker } from '../../components/NewMarker/NewMarker';
import { fetchLocations as fetchLocs, setNewPoint as setNewPoi } from '../../store/Data/actions';
import { getLocations, getNewPoint } from '../../store/_selectors/data.selectors';
import { setEditDetails as setEditDets } from '../../store/Application';
import { getEditDetails } from '../../store/_selectors/application.selectors';


const MapPure = ({
  fetchLocations,
  locations,
  setNewPoint,
  newPoint,
  setEditDetails,
  editDetails,
}) => {
  const [mapHeight, changeMapHeight] = useState(window.innerHeight - 64);
  const history = useHistory();
  const { id: idParam } = useParams();

  useEffect(() => {
    const resize = () => changeMapHeight(window.innerHeight - 64);
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleMapClick = (e) => {
    if (idParam) {
      history.push('/locations');
      if (editDetails) {
        setEditDetails(false);
      }
    } else {
      setNewPoint(e.latlng);
      history.push('/locations/new');
    }
  };

  const handleMarkerClick = (data) => {
    history.push(`/locations/${data.target.options.id}`);
  };

  const handleNewMarkerClick = () => {
    setNewPoint(null);
    history.push('/locations');
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
      {locations.map((location) => (
        <Marker
          key={location.id}
          location={location}
          onClick={handleMarkerClick}
          active={Number(idParam) === location.id}
        />
      ))}

      {newPoint && idParam === 'new' && <NewMarker position={newPoint} onClick={handleNewMarkerClick} />}
      <ZoomControl position="bottomright" />
    </LeafletMap>
  );
};

const mapStateToProps = (store) => ({
  locations: getLocations(store),
  newPoint: getNewPoint(store),
  editDetails: getEditDetails(store),
});

const mapDispatchToProps = ({
  fetchLocations: fetchLocs,
  setNewPoint: setNewPoi,
  setEditDetails: setEditDets,
});

export const Map = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapPure);
