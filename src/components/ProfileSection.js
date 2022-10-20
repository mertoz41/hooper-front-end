import React from "react";
import { Box, Image, Avatar, Text, Heading, Button } from "@chakra-ui/react";

const ProfileSection = () => {
  return (
    <Box
      position={"absolute"}
      zIndex={1}
      left={0}
      right={0}
      bottom={0}
      padding={5}
      top={0}
      margin="auto"
      display={"flex"}
      flexDirection="column"
      height={450}
      width={600}
      borderRadius={20}
      borderWidth={2}
      backgroundColor="rgba(255,255,255,.2)"
      backdropFilter="auto"
      backdropBlur="10px"
    >
      <Box
        flex={1}
        // backgroundColor={"red"}
        flexDirection="row"
        display={"flex"}
        textAlign="center"
      >
        <Image borderRadius="full" h={200} src="https://bit.ly/dan-abramov" />
        <Box>
          <Heading>
            <Text fontSize={23} textAlign="center">
              NAME GOES HERE
            </Text>
          </Heading>
          <Text>6'3, SG</Text>
          <Text>plays like Lebron James</Text>
        </Box>
      </Box>
      <Box flex={1}></Box>
    </Box>
  );
};

export default ProfileSection;
