import React, { Fragment } from "react";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./pages/register";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import store from "./redux/store";
import { API_ROOT } from "./utilities";

class App extends React.Component {
  componentDidMount() {
    this.checkJwt();
  }

  checkJwt = () => {
    if (localStorage.getItem("jwt")) {
      fetch(`${API_ROOT}/check`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp);
          store.dispatch({ type: "LOG_USER_IN", currentUser: resp });
        });
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path="/register"
            render={() =>
              this.props.currentUser ? <Redirect to="/explore" /> : <Register />
            }
          />
          <Route
            exact
            path={"/"}
            render={() =>
              this.props.currentUser ? <Explore /> : <Redirect to="/login" />
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
