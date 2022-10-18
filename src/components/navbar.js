import React, { Component } from "react";
import { Search, Grid, Button, Icon } from "semantic-ui-react";
import hoop from "../hoopster.png";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import store from "../redux/store";
import { Box, Image } from "@chakra-ui/react";

export class Navbar extends Component {
  state = {
    searching: "",
    hoopers: [],
  };

  fixState = (event) => {
    // controlled form to display users on searchbar

    let hooper = event.target.value;
    let found = this.props.allUsers.filter((user) =>
      user.username.includes(hooper)
    );
    found = found.map((hooper) => ({
      title: hooper.username,
      image: hooper.picture,
    }));
    this.setState({
      searching: hooper,
      hoopers: found,
    });
  };

  selectedHooper = (event) => {
    // function to find searched user
    let found = this.props.allUsers.find(
      (user) => user.username === event.target.innerText
    );
    this.fetchSearchedUser(found.id);
  };

  fetchSearchedUser = (id) => {
    // function to get searched user information

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

  redirect = () => {
    // function to redirect to explore page

    store.dispatch({ type: "CLEAR_SEARCHED_USER" });
    this.props.history.push("/explore");
  };

  logout = () => {
    // function to logout

    store.dispatch({ type: "LOG_USER_OUT" });
    localStorage.clear();
    this.props.history.push("/login");
  };

  userProfile = () => {
    // function to redirect to logged in users profile
    this.fetchSearchedUser(this.props.currentUser.id);
  };

  render() {
    return (
      <Box
        backgroundColor={"darkgray"}
        height={200}
        display="flex"
        paddingX={5}
      >
        <Box flex={1} display="flex" alignSelf="center">
          <Grid>
            <Grid.Column width={3}>
              <Search
                placeholder="Search hoopers"
                results={this.state.hoopers}
                value={this.state.searching}
                onResultSelect={(event) => this.selectedHooper(event)}
                onSearchChange={(event) => this.fixState(event)}
              />
            </Grid.Column>
          </Grid>
        </Box>
        <Box flex={2}>
          <Image src={hoop} m="0 auto" height={230} />
        </Box>
        <Box
          flex={1}
          justifyContent="flex-end"
          display="flex"
          alignSelf="center"
        >
          <Button
            className="username-button"
            icon
            labelPosition="right"
            onClick={this.userProfile}
          >
            <Icon name="user" />
            {this.props.currentUser.username}
          </Button>
          <Button icon labelPosition="right" onClick={this.logout}>
            Logout <Icon name="sign out alternate" />
          </Button>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    allUsers: state.allUsers,
  };
};

export default connect(mapStateToProps)(withRouter(Navbar));
