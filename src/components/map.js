import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";
import { connect } from "react-redux";
//
// export class Map extends Component {
const Map = ({ locations, selectMarker }) => {
  // render() {
  // AIzaSyA_-d_4j-YXUL1wE9WIbJdp4tBNtWCvkK0
  let iconMarker = new window.google.maps.MarkerImage(
    "https://lh3.googleusercontent.com/bECXZ2YW3j0yIEBVo92ECVqlnlbX9ldYNGrCe0Kr4VGPq-vJ9Xncwvl16uvosukVXPfV=w300",
    null /* size is determined at runtime */,
    null /* origin is 0,0 */,
    null /* anchor is bottom center of the scaled image */,
    new window.google.maps.Size(32, 32)
  );
  const GoogleMapExample = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap center={{ lat: 38.907852, lng: -77.072807 }} defaultZoom={13}>
        {/* <Marker position={this.props.currentLocation} icon={iconMarker} /> */}
        {locations.map((marker) => (
          <Marker
            key={marker.id}
            position={{
              lat: parseFloat(marker.latitude),
              lng: parseFloat(marker.longitude),
            }}
            onClick={() => selectMarker(marker)}
          />
        ))}
      </GoogleMap>
    ))
  );
  return (
    <div>
      <GoogleMapExample
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_-d_4j-YXUL1wE9WIbJdp4tBNtWCvkK0&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, width: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
  // }
};
const mapStateToProps = (state) => {
  return {
    currentLocation: state.currentLocation,
    apiLocations: state.apiLocations,
  };
};
export default connect(mapStateToProps)(Map);
