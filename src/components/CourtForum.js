import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Heading,
  CloseButton,
  Input,
  Flex,
} from "@chakra-ui/react";

const CourtForum = ({ location, setSelectedMarker }) => {
  const [message, setMessage] = useState("");
  const [postings, setPostings] = useState([]);
  useEffect(() => {
    getPostings(location.id);
  }, [location]);
  const getPostings = (id) => {
    fetch(`http://localhost:3000/postings/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setPostings(resp.postings);
      });
  };
  const postPosting = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/postings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ message: message, location_id: location.id }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        let updatedPostings = [...postings, resp.posting];
        setPostings(updatedPostings);
        setMessage("");
      });
  };
  const getTiming = (created_at) => {
    let _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let timeNow = new Date();
    let created = new Date(created_at);
    // minutes
    let difference = timeNow - created;
    let differenceMinute = Math.floor(difference / 1000 / 60);
    let differenceHour = Math.floor(difference / 1000 / 60 / 60);

    let utcnow = Date.UTC(
      timeNow.getFullYear(),
      timeNow.getMonth(),
      timeNow.getDate()
    );
    let utcitem = Date.UTC(
      created.getFullYear(),
      created.getMonth(),
      created.getDate()
    );

    if (differenceMinute < 60) {
      if (differenceMinute < 1) {
        return "just now";
      } else {
        return `${differenceMinute} ${
          differenceMinute == 1 ? "minute" : "minutes"
        } ago`;
      }
    } else if (differenceHour < 24) {
      if (differenceHour == 1) {
        return `${differenceHour} hour ago`;
      } else {
        return `${differenceHour} hours ago`;
      }
    } else {
      let result = Math.floor((utcnow - utcitem) / _MS_PER_DAY);
      if (result == 1) {
        return `${result} day ago`;
      } else {
        return `${result} days ago`;
      }
    }
  };
  return (
    <Box
      display={"flex"}
      flex={1}
      justifyContent="space-between"
      flexDir={"column"}
      height={"100%"}
    >
      <Box overflow={"auto"}>
        <Heading
          display={"flex"}
          flexDir="row"
          textAlign={"right"}
          justifyContent="space-between"
          borderBottomWidth={1}
          borderBottomColor={"lightgray"}
        >
          <Box>
            <CloseButton
              size="sm"
              backgroundColor={"white"}
              onClick={() => setSelectedMarker(null)}
            />
          </Box>
          <Box>
            <Text fontSize={16}>{location.name}</Text>
            <Text fontSize={12}>{location.address}</Text>
          </Box>
        </Heading>
        <Box overflow={"auto"}>
          {postings.length
            ? postings.map((post) => (
                <Box
                  key={post.id}
                  borderBottomWidth={1}
                  borderBottomColor={"darkgray"}
                  marginBottom={2}
                >
                  <Flex justifyContent={"space-between"}>
                    <Text fontSize={16} fontWeight={"bold"}>
                      {post.username}
                    </Text>
                    <Text alignSelf={"flex-end"} fontSize={11}>
                      {getTiming(post.created_at)}
                    </Text>
                  </Flex>
                  <Text>{post.message}</Text>
                </Box>
              ))
            : null}
        </Box>
      </Box>
      <form onSubmit={(e) => postPosting(e)}>
        <Flex>
          <Input
            value={message}
            textAlign="left"
            placeholder="leave your message here..."
            onChange={(event) => setMessage(event.target.value)}
          />
          <Button type="submit">send</Button>
        </Flex>
      </form>
    </Box>
  );
};

export default CourtForum;
