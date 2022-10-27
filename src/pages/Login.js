import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Ball from "../assets/ball.gif";
import store from "../redux/store";
import { API_ROOT } from "../utilities";
import Hoop from "../assets/hoopster.png";
import { Box, Button, Heading, Input, Text, Image } from "@chakra-ui/react";
const Login = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const history = useHistory();
  const login = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`${API_ROOT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.user_data) {
          localStorage.setItem("jwt", resp.token);
          store.dispatch({ type: "UPDATE_CURRENT_USER", currentUser: resp.user_data });
          setLoading(false);
        } else {
          alert(resp.message);
        }
      });
  };

  return (
    <Box h="100vh" display="flex" flexDir={"column"} justifyContent={{lg: "center"}}>
      <Box
        w={{ sm: "100%", lg: "30%" }}
        alignSelf="center"
        height={{sm: "100%", lg: 'auto'}}
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
          {loading ? (
            <Box justifyContent={"center"} display="flex">
              <Image src={Ball} w={20} m="0 auto" />
            </Box>
          ) : (
            <Box>
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
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Login;
