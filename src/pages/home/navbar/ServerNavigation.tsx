import { Box, styled } from "@mui/system";
import AddNewServer from "./AddNewServer";
import { Button, Divider } from "@mui/material";
import ServerNavigationItem from "./ServerNavigationItem";
import avatar from "./../../../assets/avatar.jpg";
import { auth, db } from "../../../firebase/firebase";
import { selectCurrentUser } from "../../../redux-slices/currentUserSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import LogOutButton from "../../../components/LogOutButton";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectServerList, setCurrentServer, subscribeToServerList } from "../../../redux-slices/serverSlice";
import { AppDispatch } from "../../../main";
import { Unsubscribe } from "firebase/auth";
import { ServerListItem } from "../../../types";
import styles from './../Home.module.css';


const NavigationSidebar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const username = currentUser.username;
  const dispatch: AppDispatch = useDispatch();
  const serverList = useSelector(selectServerList);

  useEffect(() => {
    let unsubscriber: Unsubscribe | undefined;
    const updateServerList = async () => {
      try {
        unsubscriber = await dispatch(subscribeToServerList(username));
        // console.log('Subscribe to server list successfully');
      } catch (error) {
        console.log(error);
      }
    }
    updateServerList();
    return () => {
      if (unsubscriber) {
        unsubscriber();
      }
      // console.log('Unsubscribed from server list successfully');
    }
  }, [currentUser, subscribeToServerList, dispatch])

  const containerStyle = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: "10px",
    flexDirection: "column",
  }

  const boxStyle = {
    flexGrow: "1",
    display: "flex",
    alignItems: "center",
    paddingTop: "10px",
    flexDirection: "column",
    gap: "10px",
    overflowY: "scroll",
    paddingBottom: "10px"
  };

  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={boxStyle} className={styles.hiddenScroll}>
        {/* Navigate to direct messages */}
        <ServerNavigationItem id="me" name="Me" photoURL={currentUser.photoURL} />
        <Divider
          variant="middle"
          orientation="horizontal"
          flexItem
          sx={{ border: "1px solid #404249" }}
        />
        {/* Navigate to servers */}
        {serverList.map((server: ServerListItem) => (
          <ServerNavigationItem
            key={server.serverName}
            id={server.serverName}
            name={server.serverName}
            photoURL={server.photoURL}
          />
        ))}
        {/* Add New Server Button */}
        <AddNewServer />
      </Box>

      {/* Logout Button */}
      <LogOutButton handleLogOut={handleLogOut} />
    </Box>
  );
};

export default NavigationSidebar;
