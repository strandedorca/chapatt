import { Box, styled } from "@mui/system";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBar = styled('input')({
    width: "100%",
    border: "none",
    borderRadius: "5px",
    height: "36px",
    padding: "10px",
    backgroundColor: "black",
    color: "white",
});
const boxStyle = {
    height: "100%",
    padding: "20px 30px",
    position: "relative"
};

const FriendsPage = () => {
  return (
    <Box sx={boxStyle}>
        <SearchBar type="text" placeholder="Search" />
        <SearchRoundedIcon 
            sx={{ position: "absolute",
                top: "25px",
                right: "35px"
            }}
        />
    </Box>
  )
}

export default FriendsPage