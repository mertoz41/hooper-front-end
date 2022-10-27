import React, { useState } from "react";
import hoop from "../assets/hoopster.png";
import { connect } from "react-redux";
import store from "../redux/store";
import {
  Box,
  Image,
  Input,
  Text,
  Button,
  CloseButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import AvatarPlaceholder from "../assets/placeholder.png";
import { API_ROOT } from "../utilities";
import Ball from "../assets/ball.gif";
import HamburgerIcon from "../assets/HamburgerIcon.svg";
const NavBar = ({
  setSearchedUser,
  setDisplayNewCourt,
  currentUser,
  renderError,
  setUserLocation,
  userLocation,
}) => {
  const [searching, setSearching] = useState("");
  const [hoopers, setHoopers] = useState([]);
  const [userLocationLoading, setUserLocationLoading] = useState(false);
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
        })
        .catch((err) => {
          renderError();
        });
    }
  };

  const getUserLocation = () => {
    if (userLocation) {
      let location = { ...userLocation };
      setUserLocation(location);
    } else {
      setUserLocationLoading(true);
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setUserLocationLoading(false);
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
      })
      .catch((err) => renderError());
  };

  const clearSearch = () => {
    setSearching("");
    setHoopers([]);
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
      paddingX={{ xl: 5 }}
      height={100}
      w={{ sm: "98%", lg: "70%" }}
      display="flex"
      position={"absolute"}
      zIndex={1}
      left={0}
      marginTop={{ sm: 1 }}
      right={0}
      m="0 auto"
    >
      <Box flex={1} h="100%" display="flex" alignItems="center" w="100%">
        <Box>
          {hoopers.length || userLocationLoading ? (
            <Image
              display={{ sm: "block", lg: "none" }}
              position="absolute"
              left={0}
              top={0}
              alignSelf={"center"}
              src={Ball}
              w={{ sm: 10, lg: 16 }}
            />
          ) : null}
          <Input
            size={"sm"}
            w="100%"
            placeholder="search hoopers..."
            value={searching}
            onChange={(e) => searchUsers(e)}
          />
        </Box>

        {hoopers.length ? (
          <Box
            top={20}
            left={{ sm: 0, lg: 10 }}
            width={{ sm: "100%", lg: 160 }}
            h={{ sm: "auto", lg: 300 }}
            backgroundColor="white"
            backdropFilter="auto"
            backdropBlur="10px"
            padding={5}
            position="absolute"
            borderRadius={10}
            borderWidth={2}
          >
            <CloseButton
              position="absolute"
              right={0}
              top={0}
              onClick={() => clearSearch()}
            />
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
      <Box
        flex={1}
        display={{ sm: "none", lg: "flex" }}
        justifyContent={{ sm: "center", lg: "flex-end" }}
      >
        {hoopers.length || userLocationLoading ? (
          <Image alignSelf={"center"} src={Ball} w={{ sm: 10, lg: 16 }} />
        ) : null}
      </Box>
      <Box flex={2} display={{ sm: "none", xl: "block" }}>
        <Image src={hoop} m="0 auto" width={130} />
      </Box>
      <Box
        flex={1}
        display="flex"
        justifyContent={{ sm: "flex-end", lg: "flex-start" }}
      >
        <Button
          size={"sm"}
          right={0}
          alignSelf={"center"}
          backgroundColor="transparent"
          borderWidth={2}
          onClick={() => getUserLocation()}
        >
          your position
        </Button>
      </Box>
      <Menu>
        <MenuButton
          size={"sm"}
          alignSelf={"center"}
          backgroundColor="transparent"
          borderWidth={2}
          marginLeft={1}
          as={Button}
          display={{ sm: "flex", xl: "none" }}
        >
          <Image src={HamburgerIcon} boxSize={5} />
        </MenuButton>

        <MenuList>
          <MenuItem onClick={() => setSearchedUser(currentUser)}>
            profile
          </MenuItem>
          <MenuItem onClick={() => setDisplayNewCourt(true)}>add</MenuItem>
          <MenuItem onClick={logout}>logout</MenuItem>
        </MenuList>
      </Menu>
      <Box
        flex={1}
        justifyContent="flex-end"
        display={{ sm: "none", lg: "flex" }}
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
