import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Heading,
  CloseButton,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import AvatarPlaceholder from "../assets/placeholder.png";
import { API_ROOT, getTiming } from "../utilities";
const CourtForum = ({
  location,
  setSelectedMarker,
  selectUser,
  renderError,
}) => {
  const [message, setMessage] = useState("");
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    getPostings(location.id);
  }, [location]);
  const getPostings = (id) => {
    fetch(`${API_ROOT}/postings/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setPostings(resp.postings);
      })
      .catch((err) => {
        setSelectedMarker(null);
        renderError();
      });
  };
  const postPosting = (e) => {
    e.preventDefault();
    fetch(`${API_ROOT}/postings`, {
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
      })
      .catch((err) => {
        renderError();
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
      <Box overflow={"auto"} flex={1}>
        {postings.length ? (
          postings.map((post) => (
            <Box key={post.id} borderBottomWidth={1} marginBottom={3}>
              <Flex>
                <Image
                  src={post.avatar ? post.avatar : AvatarPlaceholder}
                  boxSize={55}
                  borderRadius="full"
                />
                <Box marginLeft={2} w="100%">
                  <Flex justifyContent={"space-between"}>
                    <Text
                      cursor={"pointer"}
                      onClick={() => selectUser(post.user_id)}
                      fontSize={16}
                      fontWeight={"bold"}
                    >
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
      <form onSubmit={(e) => postPosting(e)}>
        <Flex>
          <Textarea
            value={message}
            textAlign="left"
            placeholder="leave your message here..."
            onChange={(event) => setMessage(event.target.value)}
            
          />
          <Button
            marginLeft={2}
            type="submit"
            alignSelf={"center"}
            backgroundColor={"transparent"}
            borderWidth={1}
          >
            send
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default CourtForum;
