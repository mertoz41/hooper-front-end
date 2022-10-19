import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Heading,
  Input,
  Flex,
} from "@chakra-ui/react";

const CourtForum = ({ location }) => {
  const [message, setMessage] = useState("");
  const [postings, setPostings] = useState([]);
  useEffect(() => {
    getPostings(location.id);
  }, []);
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
  const preparePost = () => {
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
      });
  };
  return (
    <Box display={"flex"} justifyContent="center" flexDir={"column"}>
      <Heading textAlign={"center"}>{location.name}</Heading>
      <Box>
        {postings.length &&
          postings.map((post) => (
            <Box key={post.id}>
              <Flex>
                <Text>{post.username}</Text>
                <Text>{post.created_at}</Text>
              </Flex>
              <Text>{post.message}</Text>
            </Box>
          ))}
      </Box>
      <Flex>
        <Input
          value={message}
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
