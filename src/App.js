import React, { Fragment } from "react";
import "./App.css";
import Explore from "./pages/Explore";
import Login from "./components/login";
import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "./components/profile";
import Register from "./components/register";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import store from "./redux/store";

class App extends React.Component {
  state = {
    loggedIn: false,
    registered: true,
  };

  componentDidMount() {
    // this.fetchUsers();
    this.checkJwt();
  }

  checkJwt = () => {
    if (localStorage.getItem("jwt")) {
      fetch("http://localhost:3000/check", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          store.dispatch({ type: "LOG_USER_IN", currentUser: resp.user });
        });
    } else {
      this.props.history.push("/login");
    }
  };

  fetchUsers = () => {
    fetch("http://localhost:3000/users")
      .then((resp) => resp.json())
      .then((users) => {
        store.dispatch({ type: "ALL_USERS_INCOMING", allUsers: users });
      });
  };

  register = () => {
    this.setState({
      registered: true,
    });
  };
  unregister = () => {
    this.fetchUsers();
    this.setState({
      registered: false,
    });
  };

  render() {
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path="/register"
            render={() =>
              this.props.registered ? (
                <Redirect to="/login" />
              ) : (
                <Register unregister={this.unregister} />
              )
            }
          />

          <Route
            exact
            path="/explore"
            render={() =>
              this.props.currentUser ? <Explore /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/login"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/explore" />
              ) : (
                <Login register={this.register} />
              )
            }
          />

          <Route
            exact
            path="/profile/:name"
            render={() =>
              this.props.searchedUser ? (
                <Profile
                  addFeedback={this.addFeedback}
                  feedbacks={this.state.feedbacks}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    searchedUser: state.searchedUser,
  };
};

export default connect(mapStateToProps)(withRouter(App));
