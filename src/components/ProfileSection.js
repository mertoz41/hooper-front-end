import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  CloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Heading,
  Flex,
  Input,
  Divider,
  Button,
} from "@chakra-ui/react";

const ProfileSection = ({ searchedUser, setSearchedUser }) => {
  const [feedback, setFeedback] = useState("");
  const [receivedFeedbacks, setReceivedFeedbacks] = useState([]);
  const [givenFeedbacks, setGivenFeedbacks] = useState([]);
  useEffect(() => {
    setGivenFeedbacks(searchedUser.taught);
    setReceivedFeedbacks(searchedUser.taught_by);
  }, []);
  const postFeedback = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        supervisee_id: searchedUser.id,
        message: feedback,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        let updatedReceivedFeeds = [...receivedFeedbacks, resp];
        setReceivedFeedbacks(updatedReceivedFeeds);
        setFeedback("");
      });
  };
  return (
    <Box
      boxShadow="2xl"
      position={"absolute"}
      zIndex={1}
      left={0}
      right={0}
      bottom={0}
      padding={5}
      top={0}
      margin="auto"
      display={"flex"}
      height={330}
      width={600}
      borderRadius={20}
      borderWidth={2}
      backgroundColor="rgba(255,255,255,.2)"
      backdropFilter="auto"
      backdropBlur="10px"
    >
      <Box flexDirection="column" display={"flex"}>
        <Image borderRadius="full" h={180} src="https://bit.ly/dan-abramov" />

        <Box marginTop={5} textAlign="center">
          <Heading>
            <Text fontSize={23}>{searchedUser.username}</Text>
          </Heading>
          <Text>height: 6'3 position: SG</Text>
          <Text></Text>
          <Text>plays like Lebron James</Text>
        </Box>
      </Box>
      <Divider orientation="vertical" marginX={2} />
      <Flex flexDirection={"column"} flex={1}>
        <Flex flex={1} justifyContent="space-between">
          <Tabs flex={1}>
            <TabList>
              <Tab>feedbacks given</Tab>
              <Tab>received</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  {givenFeedbacks.map((feed) => (
                    <Box>
                      <Text>{feed.message}</Text>
                    </Box>
                  ))}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box>
                  {receivedFeedbacks.map((feed) => (
                    <Box>
                      <Text>{feed.supervisee_username}</Text>
                      <Text>{feed.message}</Text>
                    </Box>
                  ))}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        <CloseButton
          onClick={() => setSearchedUser(null)}
          position={"absolute"}
          right={5}
        />
        <form onSubmit={(e) => postFeedback(e)}>
          <Flex>
            <Input
              placeholder={`give this hooper feedbacks...`}
              borderColor={"lightgray"}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              borderWidth={2}
            />
            <Button type="submit">send</Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

export default ProfileSection;
