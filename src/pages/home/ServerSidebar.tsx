import { TextField, styled } from "@material-ui/core"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Avatar, Box } from "@mui/material"
import avatar from './../../assets/avatar.jpg';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CustomTooltip from "../../components/CustomTooltip";


const SearchField = styled('input')({
    backgroundColor: "#232428",
    border: "none",
    color: "#d3d3d3",
    width: "100%",
    padding: "2px 5px",
    fontSize: ".9em"
})
const Button = styled('button')({
    backgroundColor: "#2b2d31",
    border: "none",
    borderRadius: "5px",
    color: "#d3d3d3",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "15px",
    width: "100%",
    padding: "10px",
    "&:hover": {
        backgroundColor: "#36373d",
        color: "white"
    }
})
const Title = styled('p')({
    textTransform: "uppercase",
    margin: "0",
    fontSize: ".8em",
    color: "#d3d3d3"
})

const ServerSidebar = ({ users }: any) => {
  return (
    <Box
        height="100%" 
        display="flex" justifyContent="space-between" flexDirection="column"
    >
        <div>
            <Box sx={{ height: "48px" }} padding="10px">
                <SearchField placeholder="Find or start a conversation"/>
            </Box>
            <Box padding="10px" >
                <Button>
                    <PeopleAltIcon />
                    Friends
                </Button>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Title>Direct messages</Title>
                    <CustomTooltip title="Create DM">
                        <Button style={{ width: "auto" }}>+</Button>
                    </CustomTooltip>
                </Box>
                <Box>
                    {users.map((user: any) => (
                        <Button>
                            <Avatar sx={{ width: "32px", height: "32px" }}/>
                            <div>{user.name}</div>
                        </Button>
                    ))}
                </Box>
            </Box>
        </div>
        <Box sx={{
            backgroundColor: "#1e1f22",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Box display="flex" gap="10px">
                <Avatar sx={{ width: "32px", height: "32px" }} src={avatar}/>
                <div style={{ color: "#d3d3d3" }}>strandedorca</div>
            </Box>
            <SettingsRoundedIcon />
        </Box>
    </Box>
  )
}

export default ServerSidebar