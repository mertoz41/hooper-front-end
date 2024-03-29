import React, { useState } from "react";
import {
  Box,
  Heading,
  CloseButton,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { API_ROOT } from "../utilities";
const NewCourt = ({
  setDisplayNewCourt,
  setSelectedNewCourt,
  selectedNewCourt,
  renderError,
  setLocations,
}) => {
  const [value, setValue] = useState(null);
  const toast = useToast();

  const selectNewSpot = (spot) => {
    geocodeByAddress(spot.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        let splitted = spot.label.split(", ");
        let name = splitted[0];
        splitted.shift();
        let address = splitted.join(", ");
        // navigateToLocation({ lat: lat, lng: lng });
        let newSpot = { name: name, lat: lat, lng: lng, address: address };
        setSelectedNewCourt(newSpot);
      });
  };
  const addNewCourt = () => {
    fetch(`${API_ROOT}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*" 
      },
      body: JSON.stringify(selectedNewCourt),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setLocations((prevLoc) => [...prevLoc, resp]);
        setSelectedNewCourt(null);
        setDisplayNewCourt(false);
        toast({
          title: "Court added!",
          description: "We appreciate your contribution!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        renderError();
      });
  };
  return (
    <Box display={"flex"} flex={1} flexDir={"column"} height={"100%"}>
      <Heading marginBottom={5} fontSize={28} textAlign="center">
        Add a new court
      </Heading>
      <CloseButton
        onClick={() => setDisplayNewCourt(false)}
        size="md"
        position="absolute"
        right={4}
      />
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
      {selectedNewCourt && (
        <Box fontWeight={500} display={"flex"} flexDir="column">
          <Box marginTop={5}>
            <Text fontSize={16}>{selectedNewCourt.name}</Text>
            <Text fontSize={12}>{selectedNewCourt.address}</Text>
          </Box>
          <Button
            onClick={() => addNewCourt()}
            marginTop={5}
            backgroundColor="transparent"
            borderWidth={2}
          >
            add court
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NewCourt;
