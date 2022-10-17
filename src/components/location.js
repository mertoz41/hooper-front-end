import React, { Component } from "react";
import store from "../redux/store";
import Ball from "../newbball.gif";
import { connect } from "react-redux";
import { Box, Text, Button, Image } from "@chakra-ui/react";

export class ShareLocation extends Component {
  getLocation = () => {
    // function to get current users location.

    store.dispatch({ type: "LOCATION_SHARED" });
    navigator.geolocation.getCurrentPosition(this.showPosition);
  };

  showPosition = (position) => {
    // function to save current users location.

    let currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    store.dispatch({
      type: "SHARED_LOCATION",
      currentLocation: currentLocation,
    });
  };
  render() {
    return (
      <Box display={"flex"} justifyContent="center">
        {this.props.shared ? (
          <Box backgroundColor={"red"} alignSelf={"center"}>
            <Image src={Ball} height={150} />
          </Box>
        ) : (
          <Box margin={10}>
            <Text fontSize={22}>
              Share your location to see events around you.
            </Text>
            <Button marginTop={10} onClick={this.getLocation}>
              share location
            </Button>
          </Box>
        )}
      </Box>
      //   <div className="location">
      //     {this.props.shared ? (
      //       <div class="spinning-ball">
      //         <img src={Ball} width="100" />
      //       </div>
      //     ) : (
      //       <div className="words">
      //         <h3 className="sentence">
      //           Share your location to see events around you
      //         </h3>
      //         <button >Share Location</button>
      //       </div>
      //     )}
      //   </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shared: state.shared,
  };
};

export default connect(mapStateToProps)(ShareLocation);
