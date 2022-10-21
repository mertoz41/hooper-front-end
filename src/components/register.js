import React, { useState } from "react";
import { withRouter } from "react-router";
import { Box, Text, Input, Image, Button } from "@chakra-ui/react";
import Compressor from "compressorjs";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarBlob, setAvatarBlob] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [height, setHeight] = useState("");
  const [position, setPosition] = useState("");
  const [playLike, setPlayLike] = useState("");

  const fixState = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  const registerUser = () => {
    console.log(
      username,
      height,
      position,
      playLike,
      password,
      passwordConfirm
    );
    // event.preventDefault();
    // let nuUser = {
    //   username: this.state.username,
    //   password: this.state.password,
    //   picture: this.state.picture,
    // };
    // fetch("http://localhost:3000/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     user: nuUser,
    //   }),
    // })
    //   .then((resp) => resp.json())
    //   .then((resp) => {
    //     if (resp.error) {
    //       alert(resp.error);
    //     } else {
    //       alert("Success!");
    //       this.setState({
    //         success: true,
    //       });
    //       this.props.history.push("/login");
    //       this.props.unregister();
    //     }
    //   });
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
        // console.log(compressedResult, "SECOND");
        let img = URL.createObjectURL(compressedResult);
        let splitted = img.split(":");
        splitted.shift();

        setAvatar(img);
        // let imgUrl = img.join(":")
        // console.log(imgUrl)
        // (img);
        setAvatarBlob(compressedResult);
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        // setCompressedFile(res)
      },
    });
  };

  return (
    <Box
      backgroundColor={"blue"}
      h="100vh"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Box backgroundColor={"yellow"} padding={5}>
        {renderInput("username", username, setUsername)}
        <Input type="file" accept="image/*" onChange={(e) => compressPic(e)} />
        {avatar && <Image src={avatar} boxSize={10} />}
        {renderInput("height", height, setHeight)}
        {renderInput("position", position, setPosition)}
        {renderInput("play like", playLike, setPlayLike)}
        {renderInput("password", password, setPassword)}
        {renderInput("confirm password", passwordConfirm, setPasswordConfirm)}
        <Button onClick={() => registerUser()}>sign up</Button>
      </Box>
    </Box>
    // <div>
    //   <Grid
    //     textAlign="center"
    //     style={{ height: "100vh" }}
    //     verticalAlign="middle"
    //   >
    //     <Grid.Column style={{ maxWidth: 450 }}>
    //       <h1>Hooper App</h1>
    //       <Icon.Group size="big">
    //         <Icon size="big" name="basketball ball" color="orange" />
    //       </Icon.Group>
    //       <Header as="h2" color="black" textAlign="center">
    //         Sign up
    //       </Header>
    //       <Form size="large" onSubmit={(event) => this.registration(event)}>
    //         <Segment stacked>
    //           <Form.Input
    //             fluid
    //             icon="user"
    //             iconPosition="left"
    //             placeholder="Username"
    //             name="username"
    //             value={this.state.username}
    //             onChange={(event) => this.fixState(event)}
    //           />
    //           <Form.Input
    //             fluid
    //             icon="lock"
    //             iconPosition="left"
    //             placeholder="Password"
    //             type="password"
    //             name="password"
    //             value={this.state.password}
    //             onChange={(event) => this.fixState(event)}
    //           />
    //           <Form.Input
    //             fluid
    //             icon="id badge outline"
    //             iconPosition="left"
    //             placeholder="Picture URL"
    //             name="picture"
    //             value={this.state.picture}
    //             onChange={(event) => this.fixState(event)}
    //           />
    //           <Button
    //             color="orange"
    //             fluid
    //             size="large"
    //             onClick={() => this.redirect}
    //           >
    //             Register
    //           </Button>
    //         </Segment>
    //       </Form>
    //     </Grid.Column>
    //   </Grid>
    // </div>
  );
};

export default withRouter(Signup);
