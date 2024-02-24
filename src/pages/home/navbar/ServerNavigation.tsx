import { Box } from "@mui/system"
import AddNewServer from "./AddNewServer"
import { Divider } from "@mui/material"
import ServerNavigationItem from "./ServerNavigationItem"

const NavigationSidebar = () => {
  const servers = [
    {
      id: "1",
      imgUrl: "#",
      name: "Example Server",
    },
    {
      id: "2",
      imgUrl: "#",
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
        <AddNewServer />
        <Divider variant="middle" orientation="horizontal" flexItem sx={{ border: "1px solid #404249" }} />
        {servers.map((server) => (
          <ServerNavigationItem 
            key={server.id}
            id={server.id}
            name={server.name}
            imgUrl={server.imgUrl}
          />
        ))}
    </Box>
  )
}

export default NavigationSidebar