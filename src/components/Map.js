import React from "react";
import { Box } from "@chakra-ui/react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";

const GoogleMapExample = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      ref={props.onMapMounted}
      defaultCenter={{ lat: 38.907852, lng: -77.072807 }}
      defaultZoom={13}
    >
      {props.selectedNewCourt && (
        <Marker
          position={{
            lat: props.selectedNewCourt.lat,
            lng: props.selectedNewCourt.lng,
          }}
        />
      )}
      {!props.selectedNewCourt &&
        props.locations.map((marker) => (
          <Marker
            key={marker.id}
            position={{
              lat: parseFloat(marker.latitude),
              lng: parseFloat(marker.longitude),
            }}
            onClick={() => props.selectMarker(marker)}
          />
        ))}
    </GoogleMap>
  ))
);
class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.selectedNewCourt &&
      this.props.selectedNewCourt !== prevProps
    ) {
      this.map.panTo({
        lat: parseFloat(this.props.selectedNewCourt.lat),
        lng: parseFloat(this.props.selectedNewCourt.lng),
      });
    }
  }

  chooseMarker = (marker) => {
    this.props.selectMarker(marker);
    this.map.panTo({
      lat: parseFloat(marker.latitude),
      lng: parseFloat(marker.longitude),
    });
  };
  handleMapMounted = (map) => {
    this.map = map;
  };
  render() {
    return (
      <Box h="100vh">
        <GoogleMapExample
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_-d_4j-YXUL1wE9WIbJdp4tBNtWCvkK0&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, width: `100%` }} />}
          mapElement={<div style={{ height: `100%`, borderRadius: 10 }} />}
          locations={this.props.locations}
          selectMarker={this.chooseMarker}
          onMapMounted={this.handleMapMounted}
          selectedNewCourt={this.props.selectedNewCourt}
        />
      </Box>
    );
  }
}

export default Map;
