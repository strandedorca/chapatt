import { Box } from "@mui/system"
import Header from "./Header"
import Chat from "./Chat"
import { styled } from "@mui/system"
import SidebarPage from "../sidebar/SidebarPage"
import RightSidebar from "./RightSidebar"

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
            <Chat />
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