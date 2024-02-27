import { Box, styled } from "@mui/system"
import AddNewServer from "./AddNewServer"
import { Button, Divider } from "@mui/material"
import ServerNavigationItem from "./ServerNavigationItem"
import avatar from './../../../assets/avatar.jpg';
import { auth } from "../../../firebase/firebase";
import { selectCurrentUser } from "../../../redux-slices/currentUserSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import LogOutButton from "../../../components/LogOutButton";

const NavigationSidebar = () => {
  const [user] = useAuthState(auth);
  // PLACEHOLDER
  const servers = [
    {
      id: "1",
      imgUrl: null,
      name: "Example Server",
    },
    {
      id: "2",
      imgUrl: null,
      name: "Example Server",
    }
  ];
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
      {servers.map((server) => (
        <ServerNavigationItem
          key={server.id}
          id={server.id}
          name={server.name}
          imgUrl={server.imgUrl}
        />
      ))}

      {/* Add New Server Button */}
      <AddNewServer />

      {/* Logout Button */}
      <LogOutButton handleLogOut={handleLogOut} bottom="10%" />
    </Box>
  )
}

export default NavigationSidebar