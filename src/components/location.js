import React, { useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import hoop from "../hoopster.png";
import { Search } from "semantic-ui-react";

import Ball from "../newbball.gif";
import { Box, Flex, Text, Button, Image, Input } from "@chakra-ui/react";

const LocationOptions = ({ navigateToLocation, setLocations }) => {
  const [value, setValue] = useState(null);
  const [newSpot, setNewSpot] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const selectNewSpot = (spot) => {
    geocodeByAddress(spot.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        let splitted = spot.label.split(", ");
        let name = splitted[0];
        splitted.shift();
        let address = splitted.join(", ");
        navigateToLocation({ lat: lat, lng: lng });
        let newSpot = { name: name, lat: lat, lng: lng, address: address };
        setNewSpot(newSpot);
      });
  };
  const getLocation = () => {
    if (currentLocation) {
      navigateToLocation(currentLocation);
    } else {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  };

  const addNewCourt = () => {
    fetch("http://localhost:3000/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(newSpot),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setLocations((prevLoc) => [...prevLoc, resp]);
        setNewSpot(null);
      });
  };

  const showPosition = (position) => {
    let currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentLocation(currentLocation);
    navigateToLocation(currentLocation);
    setLoading(false);
  };
  return (
    <Box
      borderWidth={2}
      borderRadius={10}
      borderColor="green"
      padding={5}
      position="absolute"
      zIndex={1}
      paddingTop={0}
      height="100%"
      display="flex"
      flexDirection={"column"}
      justifyContent="space-between"
    >
      <Box>
        <Image src={hoop} m="0 auto" height={180} />
        <Text
          fontSize={18}
          marginBottom={5}
          textDecoration="underline"
          fontWeight={500}
        >
          Add new courts
        </Text>
        {newSpot ? (
          <Box fontWeight={500} display={"flex"} flexDir="column">
            <Text fontSize={16}>{newSpot.name}</Text>
            <Text fontSize={12}>{newSpot.address}</Text>
            <Button marginTop={10} onClick={() => addNewCourt()}>
              add court
            </Button>
          </Box>
        ) : (
          <GooglePlacesAutocomplete
            selectProps={{
              value,
              onChange: (e) => selectNewSpot(e),
              placeholder: "search for courts...",
              styles: {
                textInputContainer: {
                  backgroundColor: "grey",
                  display: "flex",
                  color: "red",
                },
                textInput: {
                  height: 38,
                  color: "red",
                  fontSize: 16,
                },
                predefinedPlacesDescription: {
                  color: "#1faadb",
                },
              },
            }}
          />
        )}
        <Button onClick={getLocation} marginTop={5} justifyContent="center">
          see courts around you
        </Button>
        <Input marginTop={5} placeholder="search for hoopers..." />
        {/* <Search
          placeholder="Search hoopers"

          // results={this.state.hoopers}
          // value={this.state.searching}
          // onResultSelect={(event) => this.selectedHooper(event)}
          // onSearchChange={(event) => this.fixState(event)}
        /> */}
      </Box>
      <Flex justifyContent={"space-between"}>
        <Button>your profile</Button>
        <Button>log out</Button>
      </Flex>
      {/* {loading ? <Image src={Ball} alt="spinning ball" /> : null} */}
    </Box>
  );
};

export default LocationOptions;
