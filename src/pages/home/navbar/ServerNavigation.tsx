import { Box } from "@mui/system"
import AddNewServer from "./AddNewServer"
import { Divider } from "@mui/material"
import ServerNavigationItem from "./ServerNavigationItem"
import avatar from './../../../assets/avatar.jpg';

const NavigationSidebar = () => {
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

  return (
    <Box sx={{
        backgroundColor: "#232428",
        color: "white",
        height: "100%",
        display: "flex",
        alignItems: "center",
        paddingTop: "10px",
        flexDirection: "column",
        gap: "10px",
    }}>
        <ServerNavigationItem 
          id="conversations"
          name="Me"
          imgUrl={avatar}
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
    </Box>
  )
}

export default NavigationSidebar