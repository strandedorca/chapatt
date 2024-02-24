import { Box } from "@mui/system"
import Header from "./Header"
import Chat from "./main/Chat"
import { styled } from "@mui/system"
import SidebarPage from "./server-sidebar/SidebarPage"
import RightSidebar from "./RightSidebar"
import Messages from "./Messages"
import ServerSidebar from "./ServerSidebar"

const FHBox = styled(Box)({
  height: '100%',
})

const MainLayout = () => {
  return (
    <FHBox>
      {/* Server Sidebar */}
      <FHBox 
        display={{ xs: 'none', md: 'block' }}
        width="240px"
        position="fixed"
      >
        {/* <ServerSidebar /> */}
        <SidebarPage />
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
            <Messages />
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