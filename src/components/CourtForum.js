import React, { useState } from "react";
import {
  Box,
  Image,
  Grid,
  Button,
  GridItem,
  Heading,
  Input,
  Flex,
} from "@chakra-ui/react";

const CourtForum = ({ location, locationId }) => {
  const [message, setMessage] = useState("");
  const preparePost = () => {
    // function to send a post request for a comment on a location

    fetch("http://localhost:3000/postings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        posting: { message: message, location_id: location.id },
      }),
    })
      .then((resp) => resp.json())
      .then((posting) => {
        // let locations = this.props.apiLocations;
        // let foundLocation = locations.find(
        //   (location) => location.id === posting.posting.location_id
        // );
        // foundLocation.postings.push(posting.posting);
        // let index = locations.indexOf(foundLocation);
        // let filteredLocations = locations.filter(
        //   (location) => location.id !== foundLocation.id
        // );
        // filteredLocations.splice(index, 0, foundLocation);
        // let updatedLocations = [...filteredLocations];
        // // store.dispatch({
        // //   type: "ADD_COMMENT_ON_LOCATION",
        // //   apiLocations: updatedLocations,
        // // });
      });
  };
  return (
    <Box display={"flex"} justifyContent="center" flexDir={"column"}>
      <Heading textAlign={"center"}>{location.name}</Heading>
      <Flex>
        <Input
          value={message}
          //   type={"submit"}
          textAlign="left"
          placeholder="leave your message here..."
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button onClick={() => preparePost()}>send</Button>
      </Flex>
    </Box>
  );
};

export default CourtForum;
