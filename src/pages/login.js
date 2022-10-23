import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import Hoop from "../assets/ball.gif";
import store from "../redux/store";
import { API_ROOT } from "../utilities";
import { Box, Button, Heading, Input, Text, Image } from "@chakra-ui/react";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const login = (event) => {
    event.preventDefault();
    fetch(`${API_ROOT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.user_data) {
          localStorage.setItem("jwt", resp.token);
          store.dispatch({ type: "LOG_USER_IN", currentUser: resp.user_data });
        } else {
          alert(resp.message);
        }
      });
  };

  return (
    <Box h="100vh" display="flex" flexDir={"column"} justifyContent={"center"}>
      <Box
        w="30%"
        alignSelf="center"
        padding={10}
        borderWidth={2}
        justifyContent="center"
        borderRadius={10}
      >
        <Image src={Hoop} w={40} m="0 auto" />
        <Heading marginBottom={5} alignSelf="center" textAlign={"center"}>
          <Text>Hooper App</Text>
          <Text fontSize={22}>Login</Text>
        </Heading>
        <form onSubmit={(e) => login(e)}>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            marginBottom={5}
          />
          <Input
            placeholder="password"
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            marginBottom={5}
          />
          <Button
            flex={1}
            w="100%"
            type="submit"
            backgroundColor="transparent"
            borderWidth={2}
            marginBottom={5}
          >
            login
          </Button>
          <Button
            flex={1}
            w="100%"
            type="submit"
            backgroundColor="transparent"
            borderWidth={2}
            onClick={() => history.push("/register")}
          >
            create a new account
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default withRouter(Login);
