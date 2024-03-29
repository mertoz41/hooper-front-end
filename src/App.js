import React, { Fragment, useEffect } from "react";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Register from "./pages/Register";
import { useToast } from "@chakra-ui/react";
import { connect } from "react-redux";
import store from "./redux/store";
import { API_ROOT, errorToast } from "./utilities";

const App = ({ currentUser }) => {
  const toast = useToast();
  let history = useHistory();
  useEffect(() => {
    checkJwt();
  }, []);
  const checkJwt = () => {
    if (localStorage.getItem("jwt")) {
      fetch(`/check`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          store.dispatch({ type: "LOG_USER_IN", currentUser: resp });
        })
        .catch((err) => {
          toast(errorToast);
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

export default connect(mapStateToProps)(App);
