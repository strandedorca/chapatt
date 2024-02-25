import { Box, styled } from "@mui/system";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Title from "../../../components/Title";
import { User } from './../../../types.tsx';
import { Avatar, IconButton, Typography, useTheme } from "@mui/material";
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import PersonRemoveAlt1RoundedIcon from '@mui/icons-material/PersonRemoveAlt1Rounded';
import TextField from "@mui/material";

const SearchBar = styled('input')(({theme}) => ({
    width: "100%",
    border: "none",
    borderRadius: "5px",
    height: "36px",
    padding: "10px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
}));
const boxStyle = {
    display: "flex",
    flexDirection: "column",
};
const UserBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderTop: "1px white solid"
})

// PLACEHOLDER
const onlineUsers = [
    {
        id: "1",
        name: "Nhung",
        avatarUrl: null,
    },
    {
        id: "2",
        name: "bm",
        avatarUrl: null,
    },
    {
        id: "3",
        name: "brendyn",
        avatarUrl: null,
    }
]

const FriendsPage = () => {
  return (
    <Box 
        height="100%"
        padding="20px 30px"
        position="relative"
    >
        {/* Searchbar */}
        <Box>
            <SearchBar type="text" placeholder="Search" />
            <SearchRoundedIcon
                sx={{ position: "absolute",
                    top: "26px",
                    right: "40px"
                }}
            />
        </Box>
        <Box paddingY="20px">
            <Title content="online" />
        </Box>
        <Box sx={boxStyle}>
            {onlineUsers.map((user: User) => {
                return(
                    <UserBox key={user.id}>
                        <Box display="flex" gap="10px" alignItems="center">
                            <Avatar />
                            <Typography padding="0">{user.name}</Typography>
                        </Box>
                        <Box display="flex">
                            <IconButton>
                                <AddCommentRoundedIcon />
                            </IconButton>
                            <IconButton>
                                <PersonRemoveAlt1RoundedIcon />
                            </IconButton>
                        </Box>
                    </UserBox>
                )
            })}
        </Box>
    </Box>
  )
}

export default FriendsPage