import React, { useState } from "react";
import { withRouter } from "react-router";
import {
  Box,
  Text,
  Input,
  Heading,
  Image,
  Button,
  Flex,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Compressor from "compressorjs";
import axios from "axios";
import store from "../redux/store";
import { API_ROOT, errorToast } from "../utilities";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarBlob, setAvatarBlob] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [height, setHeight] = useState("");
  const [position, setPosition] = useState("");
  const [playLike, setPlayLike] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const registerUser = async () => {
    if (password === passwordConfirm) {
      setLoading(true);
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("avatar", avatarBlob);
      formData.append("position", position);
      formData.append("height", height);
      formData.append("plays_like", playLike);
      await axios
        .post(`${API_ROOT}/users`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((resp) => {
          alert("succezs");
          logUserIn(username, password);
        })
        .catch((err) => toast(errorToast));
    } else {
      alert("passwords dont match");
    }
  };
  const logUserIn = (username, password) => {
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
          setLoading(false);
        }
      })
      .catch((err) => toast(errorToast));
  };
  const renderInput = (label, value, setFunc) => {
    return (
      <Box display={"flex"} marginBottom={5}>
        <Text alignSelf={"center"} flex={1}>
          {label}
        </Text>

        <Input
          flex={2}
          value={value}
          type={
            label === "password" || label === "confirm password"
              ? "password"
              : null
          }
          onChange={(e) => setFunc(e.target.value)}
          placeholder="enter here"
        />
      </Box>
    );
  };

  const compressPic = (e) => {
    const pic = e.target.files[0];
    new Compressor(pic, {
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        let img = URL.createObjectURL(compressedResult);
        setAvatar(img);
        setAvatarBlob(compressedResult);
      },
    });
  };

  return (
    <Box h="100vh" display="flex" flexDir={"column"} justifyContent={"center"}>
      <Box
        w="30%"
        alignSelf="center"
        padding={5}
        borderWidth={2}
        justifyContent="center"
        borderRadius={10}
      >
        <Heading marginBottom={5} alignSelf="center" textAlign={"center"}>
          <Text>Hooper App</Text>
          <Text fontSize={22}>Register</Text>
        </Heading>
        <Box padding={5}>
          {renderInput("username", username, setUsername)}
          <Flex>
            <Text flex={1}>avatar</Text>
            <Input
              flex={2}
              type="file"
              borderColor={"transparent"}
              accept="image/*"
              onChange={(e) => compressPic(e)}
              textAlign="center"
            />
          </Flex>
          {avatar && <Image src={avatar} boxSize={10} />}
          {renderInput("height", height, setHeight)}
          {renderInput("position", position, setPosition)}
          {renderInput("play like", playLike, setPlayLike)}
          {renderInput("password", password, setPassword)}
          {renderInput("confirm password", passwordConfirm, setPasswordConfirm)}
          {loading ? (
            <Flex justifyContent={"center"}>
              <Spinner size="lg" />
            </Flex>
          ) : (
            <Button
              onClick={() => registerUser()}
              w={"100%"}
              backgroundColor="transparent"
              borderWidth={2}
            >
              sign up
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(Signup);
