import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl, Tooltip } from 'react-leaflet';

export const MainPage = () => {
  const [mapHeight, changeMapHeight] = useState(window.innerHeight - 64);
  const [newPoint, setNewPoint] = useState(null);

  useEffect(() => {
    const resize = () => changeMapHeight(window.innerHeight - 64);
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  const handleMapClick = e => {
    setNewPoint(e.latlng);
  };

  return (
    <Map
      style={{ height: `${mapHeight}px`, width: '100%' }}
      zoom={16}
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
      <Marker position={[50.28862, 18.677442]}>
        <Popup>
          <button onClick={() => window.alert('It works!')}>Click me</button>
        </Popup>
        <Tooltip direction="top">
          sfdsfsdf
        </Tooltip>
      </Marker>
      {newPoint && <Marker position={newPoint} onClick={() => setNewPoint(null)}></Marker>}
      <ZoomControl position="bottomright" />
    </Map>
  );
};
