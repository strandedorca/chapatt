import { Box } from "@mui/system"
import Header from "./Header"
import Chat from "./main/Chat"
import { styled } from "@mui/system"
import SidebarPage from "./server-sidebar/SidebarPage"
import RightSidebar from "./right-sidebar/RightSidebar"
import Messages from "./main-huyen/Messages"
import ServerSidebar from "./server-sidebar-huyen/ServerSidebar"
import { Outlet } from "react-router"

const FHBox = styled(Box)({
  height: '100%',
})

const users = [
  {
    id: "1",
    name: "Nhung",
  },
  {
    id: "2",
    name: "Brendyn",
  },
  { 
    id: "3",
    name: "Demon Lord"
  }
]

const MainLayout = () => {
  return (
    <FHBox>
      {/* Server Sidebar */}
      <FHBox 
        display={{ xs: 'none', md: 'block' }}
        width="240px"
        position="fixed"
      >
        <ServerSidebar users={users}/>
        {/* <SidebarPage /> */}
      </FHBox>

      {/* Main */}
      <FHBox 
        paddingLeft={{ md: "240px" }}
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Box>
          <Header />
        </Box>
        {/* Convo + Right Sidebar */}
        <FHBox display="flex">
          <FHBox flexGrow={1}>
            {/* <Messages /> */}
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