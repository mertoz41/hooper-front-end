import React, { useState } from "react";
import hoop from "../hoopster.png";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import store from "../redux/store";
import { Box, Image, Input, Text, Button } from "@chakra-ui/react";
import AvatarPlaceholder from "../assets/placeholder.jpeg";
const NavBar = ({ setSearchedUser, setDisplayNewCourt }) => {
  const [searching, setSearching] = useState("");
  const [hoopers, setHoopers] = useState([]);

  const searchUsers = (event) => {
    let hooper = event.target.value;
    setSearching(hooper);
    if (event.target.value.length > 2) {
      fetch(`http://localhost:3000/users/search/${hooper}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp);
          setHoopers(resp);
        });
    }
  };

  const fetchSearchedUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
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
    this.props.history.push("/login");
  };

  const userProfile = () => {
    this.fetchSearchedUser(this.props.currentUser.id);
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
          borderColor={"lightgray"}
          value={searching}
          onChange={(e) => searchUsers(e)}
        />

        {hoopers.length ? (
          <Box
            top={20}
            left={10}
            width={160}
            h={300}
            padding={5}
            position="absolute"
            borderRadius={10}
            borderWidth={2}
            backgroundColor="lightgray"
          >
            {hoopers.map((hooper) => (
              <Box
                key={hooper.id}
                borderBottomWidth={1}
                cursor="pointer"
                display={"flex"}
                marginBottom={2}
                onClick={() => fetchSearchedUser(hooper.id)}
              >
                <Image
                  borderRadius="full"
                  src={
                    hooper.avatar
                      ? `http://localhost:3000${hooper.avatar}`
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
        <Button size={"sm"} className="username-button" onClick={userProfile}>
          profile
        </Button>
        <Button
          size={"sm"}
          className="username-button"
          onClick={() => setDisplayNewCourt(true)}
        >
          add
        </Button>
        <Button size={"sm"} icon onClick={logout}>
          logout
        </Button>
      </Box>
    </Box>
  );
};

export default NavBar;
