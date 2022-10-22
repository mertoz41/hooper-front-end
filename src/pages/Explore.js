import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import CourtForum from "../components/CourtForum";
import { Box } from "@chakra-ui/react";
import Map from "../components/Map";
import NewCourt from "../components/NewCourt";
import ProfileSection from "../components/ProfileSection";
const ReusableBox = ({ children }) => {
  return (
    <Box
      boxShadow="2xl"
      position="absolute"
      zIndex={1}
      width={370}
      height={"70%"}
      bottom={10}
      borderWidth={2}
      left={5}
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
  const [searchedUser, setSearchedUser] = useState(null);
  const [newCourt, setDisplayNewCourt] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("jwt");
    fetch("http://localhost:3000/locations", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setLocations(resp.locations);
      });
  }, []);

  const closeNewCourt = () => {
    setSelectedNewCourt(null);
    setDisplayNewCourt(false);
  };

  return (
    <Box h="100vh">
      <Navbar
        setSearchedUser={setSearchedUser}
        setDisplayNewCourt={setDisplayNewCourt}
      />

      {searchedUser ? (
        <ProfileSection
          searchedUser={searchedUser}
          setSearchedUser={setSearchedUser}
        />
      ) : null}
      {newCourt ? (
        <ReusableBox>
          <NewCourt
            selectedNewCourt={selectedNewCourt}
            setSelectedNewCourt={setSelectedNewCourt}
            setDisplayNewCourt={closeNewCourt}
            setLocations={setLocations}
          />
        </ReusableBox>
      ) : null}
      {selectedMarker ? (
        <ReusableBox>
          <CourtForum
            setSelectedMarker={setSelectedMarker}
            location={selectedMarker}
          />
        </ReusableBox>
      ) : null}
      <Map
        selectedNewCourt={selectedNewCourt}
        selectMarker={setSelectedMarker}
        locations={locations}
      />
    </Box>
  );
};

export default Explore;
