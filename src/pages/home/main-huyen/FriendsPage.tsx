import { Box, styled } from "@mui/system";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Title from "../../../components/Title";
import { User } from './../../../types.tsx';
import { Avatar, IconButton, Typography } from "@mui/material";
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import PersonRemoveAlt1RoundedIcon from '@mui/icons-material/PersonRemoveAlt1Rounded';

const SearchBar = styled('input')({
    width: "100%",
    border: "none",
    borderRadius: "5px",
    height: "36px",
    padding: "10px",
});
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
        <Box>
            <SearchBar type="text" placeholder="Search" />
            <SearchRoundedIcon
                sx={{ position: "absolute",
                    top: "25px",
                    right: "35px"
                }}
            />
        </Box>
        <Box paddingY="10px">
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