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

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
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
