import React, { useState } from "react";
import { Search, Grid, Button, Icon } from "semantic-ui-react";
import hoop from "../hoopster.png";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import store from "../redux/store";
import { Box, Image } from "@chakra-ui/react";

const NavBar = ({ currentUser, allUsers, setDisplayNewCourt }) => {
  const [searching, setSearching] = useState("");
  const [hoopers, setHoopers] = useState([]);

  const fixState = (event) => {
    let hooper = event.target.value;
    let found = allUsers.filter((user) => user.username.includes(hooper));
    found = found.map((hooper) => ({
      title: hooper.username,
      image: hooper.picture,
    }));
    setSearching(hooper);
    setHoopers(found);
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
      borderRadius={10}
      backgroundColor="rgba(0,0,0,.2)"
      backdropFilter="auto"
      backdropBlur="10px"
      height={100}
      w="50%"
      display="flex"
      position={"absolute"}
      zIndex={1}
      left={0}
      right={0}
      m="0 auto"
    >
      <Box flex={1} display="flex" alignSelf="center">
        <Grid>
          <Grid.Column width={3}>
            <Search
              placeholder="Search hoopers"
              results={hoopers}
              value={searching}
              onResultSelect={(event) => selectedHooper(event)}
              onSearchChange={(event) => fixState(event)}
            />
          </Grid.Column>
        </Grid>
      </Box>
      <Box flex={2}>
        <Image src={hoop} m="0 auto" height={140} />
      </Box>
      <Box flex={1} justifyContent="flex-end" display="flex" alignSelf="center">
        <Button
          className="username-button"
          icon
          labelPosition="right"
          onClick={userProfile}
        >
          <Icon name="user" />
          {currentUser.username}
        </Button>
        <Button icon labelPosition="right" onClick={logout}>
          Logout <Icon name="sign out alternate" />
        </Button>
        <Button
          className="username-button"
          icon
          labelPosition="right"
          onClick={() => setDisplayNewCourt(true)}
        >
          <Icon name="user" />
          add new court
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
