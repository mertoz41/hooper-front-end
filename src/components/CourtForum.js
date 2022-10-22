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
import AvatarPlaceholder from "../assets/placeholder.jpeg";
import { getTiming } from "../utilities";
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

  return (
    <Box
      display={"flex"}
      flex={1}
      justifyContent="space-between"
      flexDir={"column"}
      height={"100%"}
    >
      <Heading
        display={"flex"}
        flexDir="row"
        textAlign={"left"}
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor={"lightgray"}
      >
        <Box>
          <Text fontSize={16}>{location.name}</Text>
          <Text fontSize={12}>{location.address}</Text>
        </Box>
        <Box>
          <CloseButton size="sm" onClick={() => setSelectedMarker(null)} />
        </Box>
      </Heading>
      <Box overflow={"auto"}>
        <Box overflow={"auto"}>
          {postings.length ? (
            postings.map((post) => (
              <Box
                key={post.id}
                borderBottomWidth={1}
                borderBottomColor={"darkgray"}
                marginBottom={3}
              >
                <Flex>
                  <Image
                    src={post.avatar ? post.avatar : AvatarPlaceholder}
                    boxSize={55}
                    borderRadius="full"
                  />
                  <Box marginLeft={2} w="100%">
                    <Flex justifyContent={"space-between"}>
                      <Text fontSize={16} fontWeight={"bold"}>
                        {post.username}
                      </Text>
                      <Text alignSelf={"flex-start"} fontSize={11}>
                        {getTiming(post.created_at)}
                      </Text>
                    </Flex>
                    <Text>{post.message}</Text>
                  </Box>
                </Flex>
              </Box>
            ))
          ) : (
            <Text textAlign="center">No postings here yet...</Text>
          )}
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
