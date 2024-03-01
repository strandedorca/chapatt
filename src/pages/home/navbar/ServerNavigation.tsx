import { Box, styled } from "@mui/system"
import AddNewServer from "./AddNewServer"
import { Button, Divider } from "@mui/material"
import ServerNavigationItem from "./ServerNavigationItem"
import avatar from './../../../assets/avatar.jpg';
import { auth, db } from "../../../firebase/firebase";
import { selectCurrentUser } from "../../../redux-slices/currentUserSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import LogOutButton from "../../../components/LogOutButton";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setServer } from "../../../redux-slices/serverSlice";

const NavigationSidebar = () => {
  const [user] = useAuthState(auth);
  const currentUser = useSelector(selectCurrentUser);
  const username = currentUser.username;
  const [servers, setServers] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'servers'), where('members', 'array-contains', username)), (snapshot) => {
      const updatedServers: any = [];
      snapshot.forEach((doc) => {
        const serverData = {
          serverName: doc.id,
          members: doc.data().members,
          messages: doc.data().messages,
        };
        updatedServers.push(serverData);
      });
      setServers(updatedServers);
      dispatch(setServer(updatedServers) as any);
    }, (error) => {
      console.error('Error getting real-time server data:', error);
    });

    // Clean up the listener
    return () => unsubscribe();
  }, [user]);

  const boxStyle = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: "10px",
    flexDirection: "column",
    gap: "10px",
  }

  const handleLogOut = () => {
    auth.signOut();
  }

  return (
    <Box sx={boxStyle}>
      {/* Navigate to direct messages */}
      <ServerNavigationItem
        id="me"
        name="Me"
        imgUrl={user?.photoURL}
      />

      <Divider variant="middle" orientation="horizontal" flexItem sx={{ border: "1px solid #404249" }} />

      {/* Navigate to servers */}
      {servers.map((server: any) => (
        <ServerNavigationItem
          key={server.serverName}
          id={server.serverName}
          name={server.serverName}
        // imgUrl={server.imgUrl}
        />
      ))}

      {/* Add New Server Button */}
      <AddNewServer />

      {/* Logout Button */}
      <LogOutButton handleLogOut={handleLogOut} bottom="0" />
    </Box>
  )
}

export default NavigationSidebar