import React, { useState } from "react";
import hoop from "../hoopster.png";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import store from "../redux/store";
import { Box, Image, Input, Text, Button, Icon } from "@chakra-ui/react";

const NavBar = ({ currentUser, allUsers, setDisplayNewCourt }) => {
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

  const selectedHooper = (event) => {
    let found = allUsers.find(
      (user) => user.username === event.target.innerText
    );
    fetchSearchedUser(found.id);
  };

  const fetchSearchedUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((resp) => resp.json())
      .then((user) => {
        store.dispatch({ type: "SEARCHED_USER", searchedUser: user });
        store.dispatch({
          type: "SEARCHED_USER_FEEDBACKS",
          feedbacks: user.taught_by,
        });
        this.props.history.push(`/profile/${user.username}`);
      });
  };

  const redirect = () => {
    store.dispatch({ type: "CLEAR_SEARCHED_USER" });
    this.props.history.push("/explore");
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
      <Box flex={1} h="100%" display="flex" alignItems="center">
        <Input
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
            backgroundColor="red"
            // backgroundColor="rgba(255,255,255,.2)"
            backdropFilter="auto"
            backdropBlur="10px"
          >
            {hoopers.map((hooper) => (
              <Box key={hooper.id} borderBottomWidth={1}>
                <Text>{hooper.username}</Text>
              </Box>
            ))}
          </Box>
        ) : null}
        {/* <Grid>
          <Grid.Column width={3}>
            <Search
              placeholder="Search hoopers"
              results={hoopers}
              value={searching}
              onResultSelect={(event) => selectedHooper(event)}
              onSearchChange={(event) => searchUsers(event)}
            />
          </Grid.Column>
        </Grid> */}
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    allUsers: state.allUsers,
  };
};

export default connect(mapStateToProps)(withRouter(NavBar));
