import { Box } from "@mui/system"
import AddNewServer from "./AddNewServer"
import { Button, Divider } from "@mui/material"
import ServerNavigationItem from "./ServerNavigationItem"
import avatar from './../../../assets/avatar.jpg';
import { auth } from "../../../firebase/firebase";

const NavigationSidebar = () => {
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

  const handleGoogleLogout = () => {
    auth.signOut();
  }

  return (
    <Box sx={boxStyle}>
        <ServerNavigationItem 
          id="me"
          name="Me"
          imgUrl={avatar}           // PLACEHOLDER
        />
        <Divider variant="middle" orientation="horizontal" flexItem sx={{ border: "1px solid #404249" }} />
        {servers.map((server) => (
          <ServerNavigationItem 
            key={server.id}
            id={server.id}
            name={server.name}
            imgUrl={server.imgUrl}
          />
        ))}
        <AddNewServer />
        <Button onClick={handleGoogleLogout}>Log out</Button>
    </Box>
  )
}

export default NavigationSidebar