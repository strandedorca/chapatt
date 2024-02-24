import { TextField, styled } from "@material-ui/core"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Avatar, Box } from "@mui/material"

const SearchField = styled('input')({
    backgroundColor: "#232428",
    border: "none",
    color: "grey",
    width: "100%",
    padding: "2px 5px",
    fontSize: ".9em"
})
const Button = styled('button')({
    backgroundColor: "#2b2d31",
    border: "none",
    color: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
})
const Title = styled('p')({
    textTransform: "uppercase",
    marginTop: "10px",
    margin: "0",
    fontSize: ".8em",
    color: "grey"
})

const ServerSidebar = () => {
  return (
    <Box>
        <Box sx={{ height: "48px" }} padding="10px">
            <SearchField placeholder="Find or start a conversation"/>
        </Box>
        <Box padding="10px 20px" >
            <Button>
                <PeopleAltIcon />
                Friends
            </Button>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt="20px">
                <Title>Direct messages</Title>
                <Button>+</Button>
            </Box>
            <Box>
                <Button>
                    <Avatar sx={{ width: "30px", height: "30px" }}/>
                </Button>
            </Box>
        </Box>
    </Box>
  )
}

export default ServerSidebar