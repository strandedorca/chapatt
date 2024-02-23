import { Box } from "@mui/system"
import { Outlet } from "react-router-dom"
import ServerNavigation from "./ServerNavigation"

const Home = () => {
    return (
        <Box sx={{
            height: "100%",
        }}>
            {/* Server NavBar */}
            <Box sx={{
                display: { xs: 'none', md: 'block' },
                height: "100%",
                // flexDirection: "column",
                width: "72px",
                position: "fixed",
            }}>
                <ServerNavigation />
            </Box>
            <Box sx={{
                paddingLeft: { md: "72px" },
                height: "100%"
            }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Home