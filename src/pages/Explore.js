import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar";
import ShareLocation from "../components/location";
import CourtForum from "../components/CourtForum";
import { Box, Image, Grid, GridItem } from "@chakra-ui/react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";
const Explore = () => {
  const mapRef = useRef();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("jwt");
    fetch("http://localhost:3000/locations", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setLocations(resp.locations);
      });
  }, []);

  const selectMarker = (marker) => {
    setSelectedLocation(marker);
  };

  const navigateToLocation = (coords) => {
    mapRef.current.panTo(coords);
  };
  const GoogleMapExample = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        ref={mapRef}
        defaultCenter={{ lat: 38.907852, lng: -77.072807 }}
        defaultZoom={13}
      >
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
    <Grid
      h="100vh"
      templateRows="repeat(5, 1fr)"
      templateColumns="repeat(8, 1fr)"
      gap={4}
      padding={5}
    >
      {/* <GridItem rowSpan={1} colSpan={7}>
        <Navbar />
      </GridItem> */}
      <GridItem rowSpan={5} colSpan={2}>
        <ShareLocation
          setLocations={setLocations}
          navigateToLocation={navigateToLocation}
        />
      </GridItem>
      <GridItem
        rowSpan={5}
        colSpan={4}
        borderWidth={2}
        borderRadius={10}
        borderColor="green"
        justifyContent={"center"}
        display={"flex"}
        alignItems="center"
      >
        {/* <GoogleMapExample
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_-d_4j-YXUL1wE9WIbJdp4tBNtWCvkK0&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, width: `100%` }} />}
          mapElement={<div style={{ height: `100%`, borderRadius: 10 }} />}
        /> */}
      </GridItem>
      <GridItem rowSpan={5} colSpan={2} flex={1}>
        {selectedLocation ? (
          <CourtForum
            setSelectedLocation={setSelectedLocation}
            location={selectedLocation}
          />
        ) : null}
      </GridItem>
    </Grid>
  );
};

export default Explore;
