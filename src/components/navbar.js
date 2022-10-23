import React, { useState } from "react";
import hoop from "../assets/hoopster.png";
import { connect } from "react-redux";
import store from "../redux/store";
import { Box, Image, Input, Text, Button } from "@chakra-ui/react";
import AvatarPlaceholder from "../assets/placeholder.png";
import { API_ROOT } from "../utilities";
const NavBar = ({ setSearchedUser, setDisplayNewCourt, currentUser }) => {
  const [searching, setSearching] = useState("");
  const [hoopers, setHoopers] = useState([]);

  const searchUsers = (event) => {
    let hooper = event.target.value;
    setSearching(hooper);
    if (event.target.value.length > 2) {
      fetch(`${API_ROOT}/users/search/${hooper}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          setHoopers(resp);
        });
    }
  };

  const fetchSearchedUser = (id) => {
    fetch(`${API_ROOT}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((resp) => resp.json())
      .then((user) => {
        setSearchedUser(user);
        setSearching("");
        setHoopers([]);
      });
  };

  const logout = () => {
    store.dispatch({ type: "LOG_USER_OUT" });
    localStorage.clear();
  };

  return (
    <Box
      borderRadius={20}
      borderWidth={2}
      boxShadow="2xl"
      backgroundColor="rgba(255,255,255,.2)"
      backdropFilter="auto"
      backdropBlur="10px"
      paddingX={10}
      height={100}
      w="50%"
      display="flex"
      position={"absolute"}
      zIndex={1}
      left={0}
      right={0}
      m="0 auto"
    >
      <Box flex={1} h="100%" display="flex" alignItems="center" w="100%">
        <Input
          w="100%"
          placeholder="search hoopers..."
          value={searching}
          onChange={(e) => searchUsers(e)}
        />

        {hoopers.length ? (
          <Box
            top={20}
            left={10}
            width={160}
            h={300}
            backgroundColor="transparent"
            backdropFilter="auto"
            backdropBlur="10px"
            padding={5}
            position="absolute"
            borderRadius={10}
            borderWidth={2}
          >
            {hoopers.map((hooper) => (
              <Box
                key={hooper.id}
                borderBottomWidth={1}
                backdropBlur="10px"
                display={"flex"}
                marginBottom={2}
                onClick={() => fetchSearchedUser(hooper.id)}
              >
                <Image
                  borderRadius="full"
                  src={
                    hooper.avatar
                      ? `${API_ROOT}${hooper.avatar}`
                      : AvatarPlaceholder
                  }
                  boxSize={30}
                />
                <Text alignSelf={"center"} marginLeft={2}>
                  {hooper.username}
                </Text>
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
      <Box flex={2}>
        <Image src={hoop} m="0 auto" width={130} />
      </Box>
      <Box
        flex={1}
        justifyContent="flex-end"
        display="flex"
        h="100%"
        alignItems="center"
      >
        <Button
          size={"sm"}
          marginRight={2}
          borderWidth={2}
          backgroundColor="transparent"
          onClick={() => setSearchedUser(currentUser)}
        >
          profile
        </Button>
        <Button
          size={"sm"}
          marginRight={2}
          borderWidth={2}
          backgroundColor="transparent"
          onClick={() => setDisplayNewCourt(true)}
        >
          add
        </Button>
        <Button
          size={"sm"}
          onClick={logout}
          borderWidth={2}
          backgroundColor="transparent"
        >
          logout
        </Button>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({ currentUser: state.currentUser });

export default connect(mapStateToProps)(NavBar);
