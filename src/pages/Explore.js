import React, { useEffect, useState } from "react";
import Map from "../components/map";
import { Tab } from "semantic-ui-react";
import Posting from "../components/posting";
import Posts from "../components/posts";
import Navbar from "../components/navbar";
import { Redirect } from "react-router-dom";
import store from "../redux/store";
import { connect } from "react-redux";
import ShareLocation from "../components/location";
import CourtForum from "../components/CourtForum";
import { Box, Image, Grid, GridItem } from "@chakra-ui/react";

const Explore = () => {
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

  return (
    <Grid
      h="100vh"
      templateRows="repeat(5, 1fr)"
      templateColumns="repeat(7, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={1} colSpan={7}>
        <Navbar />
      </GridItem>
      <GridItem
        marginLeft={5}
        rowSpan={4}
        colSpan={2}
        bg="darkgray"
        borderRadius={10}
      >
        <ShareLocation />
      </GridItem>
      <GridItem rowSpan={4} colSpan={3} bg="papayawhip">
        <Box display={"flex"} justifyContent="center">
          <Map locations={locations} selectMarker={selectMarker} />
        </Box>
      </GridItem>
      <GridItem
        marginRight={5}
        rowSpan={4}
        colSpan={2}
        flex={1}
        bg="#E6F6FF"
        borderRadius={10}
      >
        {selectedLocation ? <CourtForum setSelectedLocation={setSelectedLocation} location={selectedLocation} /> : null}
      </GridItem>
    </Grid>
  );
};

export default Explore;
