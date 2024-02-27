import Header from "./Header"
import { styled } from "@mui/system"
import RightSidebar from "./right-sidebar/RightSidebar"
import ServerSidebar from "./server-sidebar-huyen/ServerSidebar"
import { Outlet } from "react-router"
import { Button, Box } from "@mui/material"
import avatar from './../../assets/avatar.jpg';

// import { useContext } from "react"
// import { WidthContext } from "../../App"


const FHBox = styled(Box)({
  height: '100%',
})

// PLACEHOLDER
const users = [
  {
    id: "1",
    name: "Nhung",
  },
  {
    id: "CLpmgYlCN5TrWUft6qjvqeW9D5A3",
    name: "Brendyn - dth",
  },
  { 
    id: "fpqn987ojSYSjlgQX4IzyD6WwNW2",
    name: "Demon Lord - hd"
  },
  {
    id: "4",
    name: "any",
    photoUrl: avatar,
  }
]

const MainLayout = () => {
  // const modalWidth = useContext(WidthContext);
  return (
    <FHBox>
      {/* Server Sidebar */}
      {/* <Button 
        sx={{ width: `${modalWidth}`, backgroundColor: "white", color: "black" }} 
      >MY TEST BOX</Button> */}
      <FHBox 
        display={{ xs: 'none', md: 'block' }}
        width="240px"
        position="fixed"
      >
        <ServerSidebar users={users}/>
      </FHBox>

      <FHBox 
        paddingLeft={{ md: "240px" }}
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Box>
          <Header />
        </Box>
        {/* Main + Right Sidebar */}
        <FHBox display="flex">
          <FHBox flexGrow={1}>
            <Outlet />
          </FHBox>
          <FHBox width="340px">
            <RightSidebar />
          </FHBox>
        </FHBox>

      </FHBox>
    </FHBox>
  )
}

export default MainLayout