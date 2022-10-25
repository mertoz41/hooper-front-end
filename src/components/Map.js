import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 38.907852,
  lng: -77.072807,
};

function Map({ locations, selectMarker, userLocation, selectedNewCourt }) {
  const [map, setMap] = React.useState(null);
  useEffect(() => {
    if (map && userLocation) {
      map.panTo(userLocation);
    }
    if (map && selectedNewCourt) {
      map.panTo({ lat: selectedNewCourt.lat, lng: selectedNewCourt.lng });
    }
  }, [userLocation, selectedNewCourt]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_MAP_API_KEY}`,
  });

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(13);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {selectedNewCourt ? (
        <Marker
          position={{
            lat: parseFloat(selectedNewCourt.lat),
            lng: parseFloat(selectedNewCourt.lng),
          }}
        />
      ) : (
        locations.map((marker) => (
          <Marker
            key={marker.id}
            position={{
              lat: parseFloat(marker.latitude),
              lng: parseFloat(marker.longitude),
            }}
            onClick={() => selectMarker(marker)}
          />
        ))
      )}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
