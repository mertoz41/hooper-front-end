import React, { Fragment, useEffect } from "react";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./pages/Register";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import store from "./redux/store";
import { API_ROOT } from "./utilities";

const App = ({ currentUser, history }) => {
  useEffect(() => {
    checkJwt();
  }, []);
  const checkJwt = () => {
    if (localStorage.getItem("jwt")) {
      fetch(`${API_ROOT}/check`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          store.dispatch({ type: "LOG_USER_IN", currentUser: resp });
        });
    } else {
      history.push("/login");
    }
  };

  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path="/register"
          render={() =>
            currentUser ? <Redirect to="/explore" /> : <Register />
          }
        />
        <Route
          exact
          path={"/"}
          render={() => (currentUser ? <Explore /> : <Redirect to="/login" />)}
        />

        <Route
          exact
          path="/explore"
          render={() => (currentUser ? <Explore /> : <Redirect to="/login" />)}
        />
        <Route
          exact
          path="/login"
          render={() => (currentUser ? <Redirect to="/explore" /> : <Login />)}
        />
      </Switch>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(withRouter(App));
