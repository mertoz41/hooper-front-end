import React, { Component } from "react";
import Map from "../components/map";
import { Tab } from "semantic-ui-react";
import Posting from "../components/posting";
import Posts from "../components/posts";
import Navbar from "../components/navbar";
import { Redirect } from "react-router-dom";
import store from "../redux/store";
import { connect } from "react-redux";
import ShareLocation from "../components/location";
import { Box, Image, Grid, GridItem } from "@chakra-ui/react";

export class Explore extends Component {
  componentDidMount() {
    // fetch for all locations to be marked on the map.

    fetch("http://localhost:3000/locations")
      .then((resp) => resp.json())
      .then((locations) => {
        store.dispatch({
          type: "API_LOCATIONS_INCOMING",
          apiLocations: locations,
        });
      });
  }
  selectMarker = (marker) => {
    // function to display postings of the incoming marker.

    store.dispatch({
      type: "SELECTED_LOCATION_INCOMING",
      selectedLocation: marker,
    });
  };

  render() {
    const panes = [
      {
        menuItem: "Postings",
        render: () => (
          <Tab.Pane>
            <Posts />{" "}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Post",
        render: () => (
          <Tab.Pane>
            <Posting />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <Grid
        h="100vh"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={5}>
          <Navbar />
        </GridItem>
        <GridItem
          marginLeft={5}
          rowSpan={6}
          colSpan={1}
          bg="darkgray"
          borderRadius={10}
        >
          <ShareLocation />
        </GridItem>
        <GridItem rowSpan={6} colSpan={3} bg="papayawhip">
          {this.props.currentLocation && this.props.shared ? (
            <div className="map">
              <Map selectMarker={this.selectMarker} />
            </div>
          ) : null}
        </GridItem>
        <GridItem
          marginRight={5}
          rowSpan={6}
          colSpan={1}
          bg="darkgray"
          borderRadius={10}
        >
          {this.props.selectedLocation ? (
            <div className="info">
              <h3>{this.props.selectedLocation.name}</h3>
              <Tab panes={panes} />
            </div>
          ) : null}
        </GridItem>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentLocation: state.currentLocation,
    selectedLocation: state.selectedLocation,
    shared: state.shared,
  };
};

export default connect(mapStateToProps)(Explore);
