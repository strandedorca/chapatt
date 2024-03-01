import Header from "./header/Header"
import { styled } from "@mui/system"
import RightSidebar from "./right-sidebar/RightSidebar"
import ServerSidebar from "./server-sidebar-huyen/ServerSidebar"
import { Outlet } from "react-router"
import { Box } from "@mui/material"
import FormDialog from "../../components/FormDialog"

const FHBox = styled(Box)({
  height: '100%',
})

const MainLayout = () => {

  return (
    <FHBox>
      {/* Prompt for username if not set yet (for users signed up with Google) */}
      {/* <Button onClick={handleClose}>CLOSE</Button> */}
      <FormDialog />
      <FHBox
        display={{ xs: 'none', md: 'block' }}
        width="240px"
        position="fixed"
      >
        <ServerSidebar />
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