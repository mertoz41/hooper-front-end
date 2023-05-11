import React, { Fragment, useEffect } from "react";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Register from "./pages/Register";
import { useToast } from "@chakra-ui/react";
import { connect } from "react-redux";
import store from "./redux/store";
import { API_ROOT, errorToast } from "./utilities";
import { Helmet } from "react-helmet";

const App = ({ currentUser }) => {
  const toast = useToast();
  let history = useHistory();
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
          store.dispatch({ type: "UPDATE_CURRENT_USER", currentUser: resp });
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hooper App</title>
        <meta
          name="description"
          content="App designed for hoopers to find new courts and organize games."
        />
        <meta name="keywords" content="Sports, Basketball" />
      </Helmet>
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
