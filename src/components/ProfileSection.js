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
import { connect } from "react-redux";
import AvatarPlaceholder from "../assets/placeholder.jpeg";
import { getTiming } from "../utilities";
const ProfileSection = ({ searchedUser, setSearchedUser, currentUser }) => {
  const [feedback, setFeedback] = useState("");
  const [receivedFeedbacks, setReceivedFeedbacks] = useState([]);
  const [givenFeedbacks, setGivenFeedbacks] = useState([]);
  useEffect(() => {
    setGivenFeedbacks(searchedUser.taught);
    setReceivedFeedbacks(searchedUser.taught_by);
  }, [searchedUser]);
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
  const renderFeedbacks = (feedbacks) =>
    feedbacks.map((feed) => (
      <Flex borderBottomWidth={1}>
        <Image
          borderRadius={"full"}
          src={
            feed.supervisee_avatar
              ? `http://localhost:3000${feed.supervisee_avatar}`
              : AvatarPlaceholder
          }
          boxSize={55}
        />
        <Box marginLeft={2} w="100%">
          <Flex justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>to {feed.supervisee_username}</Text>
            <Text fontSize={11}>{getTiming(feed.created_at)}</Text>
          </Flex>
          <Text>{feed.message}</Text>
        </Box>
      </Flex>
    ));
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
        {searchedUser.avatar ? (
          <Image
            borderRadius="full"
            h={180}
            src={`http://localhost:3000${searchedUser.avatar}`}
          />
        ) : null}

        <Box marginTop={5} textAlign="center">
          <Heading>
            <Text fontSize={23}>{searchedUser.username}</Text>
          </Heading>
          <Text>
            height: {searchedUser.height} position: {searchedUser.position}
          </Text>
          <Text></Text>
          <Text>plays like {searchedUser.plays_like}</Text>
        </Box>
      </Box>
      <Divider orientation="vertical" marginX={2} />
      <Flex flexDirection={"column"} flex={1}>
        <Flex flex={1} justifyContent="space-between">
          <Tabs flex={1}>
            <TabList>
              <Tab>feedbacks received</Tab>
              <Tab>given</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  {renderFeedbacks(receivedFeedbacks)}
                  {/* {receivedFeedbacks.map((feed) => (
                    <Flex borderBottomWidth={1}>
                      <Image
                        borderRadius={"full"}
                        src={
                          feed.supervisor_avatar
                            ? `http://localhost:3000${feed.supervisor_avatar}`
                            : AvatarPlaceholder
                        }
                        boxSize={20}
                      />
                      <Text>{feed.supervisor_username}</Text>
                      <Text>{feed.message}</Text>
                    </Flex>
                  ))} */}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box>
                  {renderFeedbacks(givenFeedbacks)}
                  {/* {givenFeedbacks.map((feed) => (
                    <Flex borderBottomWidth={1}>
                      <Image
                        borderRadius={"full"}
                        src={
                          feed.supervisee_avatar
                            ? `http://localhost:3000${feed.supervisee_avatar}`
                            : AvatarPlaceholder
                        }
                        boxSize={55}
                      />
                      <Box marginLeft={2} w="100%">
                        <Flex justifyContent={"space-between"}>
                          <Text fontWeight={"bold"}>
                            to {feed.supervisee_username}
                          </Text>
                          <Text fontSize={11}>
                            {getTiming(feed.created_at)}
                          </Text>
                        </Flex>
                        <Text>{feed.message}</Text>
                      </Box>
                    </Flex>
                  ))} */}
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
        {currentUser.id !== searchedUser.id ? (
          <form onSubmit={(e) => postFeedback(e)}>
            <Flex>
              <Input
                placeholder={`give this hooper feedbacks...`}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                borderWidth={2}
              />
              <Button type="submit">send</Button>
            </Flex>
          </form>
        ) : null}
      </Flex>
    </Box>
  );
};
const mapStateToProps = (state) => ({ currentUser: state.currentUser });

export default connect(mapStateToProps)(ProfileSection);
