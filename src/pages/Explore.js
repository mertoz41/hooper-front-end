import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CourtForum from "../components/CourtForum";
import { Box, useToast } from "@chakra-ui/react";
import Map from "../components/Map";
import NewCourt from "../components/NewCourt";
import ProfileSection from "../components/ProfileSection";
import { API_ROOT, errorToast } from "../utilities";
const ReusableBox = ({ children }) => {
  return (
    <Box
      boxShadow="2xl"
      position="absolute"
      zIndex={1}
      width={{ sm: "98%", lg: 370 }}
      height={{ sm: "60%", lg: "70%" }}
      // bottom={{ lg: 10 }}
      top={{ sm: 1, lg: 32 }}
      borderWidth={2}
      left={{ sm: 0, lg: 5 }}
      right={{ sm: 0 }}
      m={{ sm: "0 auto", lg: 0 }}
      backgroundColor="rgba(255,255,255,.2)"
      backdropFilter="auto"
      backdropBlur="10px"
      borderRadius={10}
      padding={5}
    >
      {children}
    </Box>
  );
};
const Explore = () => {
  const [locations, setLocations] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedNewCourt, setSelectedNewCourt] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const [newCourt, setDisplayNewCourt] = useState(false);
  const toast = useToast();
  useEffect(() => {
    let token = localStorage.getItem("jwt");
    fetch(`${API_ROOT}/locations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setLocations(resp.locations);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const closeNewCourt = () => {
    setSelectedNewCourt(null);
    setDisplayNewCourt(false);
  };

  const renderError = () => {
    toast(errorToast);
  };

  const selectUser = (id) => {
    fetch(`${API_ROOT}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((resp) => resp.json())
      .then((user) => {
        setSelectedMarker(null);
        setSearchedUser(user);
      });
  };

  return (
    <Box h="100vh">
      <Navbar
        setSearchedUser={setSearchedUser}
        renderError={renderError}
        setDisplayNewCourt={setDisplayNewCourt}
        setUserLocation={setUserLocation}
        userLocation={userLocation}
      />

      {searchedUser ? (
        <ProfileSection
          searchedUser={searchedUser}
          setSearchedUser={setSearchedUser}
          renderError={renderError}
          selectUser={selectUser}
        />
      ) : null}
      {newCourt ? (
        <ReusableBox>
          <NewCourt
            selectedNewCourt={selectedNewCourt}
            setSelectedNewCourt={setSelectedNewCourt}
            setDisplayNewCourt={closeNewCourt}
            setLocations={setLocations}
            renderError={renderError}
          />
        </ReusableBox>
      ) : null}
      {selectedMarker ? (
        <ReusableBox>
          <CourtForum
            setSelectedMarker={setSelectedMarker}
            location={selectedMarker}
            selectUser={selectUser}
            renderError={renderError}
          />
        </ReusableBox>
      ) : null}
      <Map
        selectedNewCourt={selectedNewCourt}
        userLocation={userLocation}
        selectMarker={setSelectedMarker}
        locations={locations}
      />
    </Box>
  );
};

export default Explore;
