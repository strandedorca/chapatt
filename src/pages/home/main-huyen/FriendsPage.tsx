import { Box, styled } from "@mui/system";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Title from "../../../components/Title";
import { User } from './../../../types.tsx';
import { Avatar, IconButton, Typography } from "@mui/material";
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import PersonRemoveAlt1RoundedIcon from '@mui/icons-material/PersonRemoveAlt1Rounded';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriendRequest, getFriendList, getPendingRequestList, selectAllFriends, selectCurrentList, selectPendingRequest } from "../../../redux-slices/friendsSlice.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase.ts";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

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
    const dispatch = useDispatch();
    const [user] = useAuthState(auth);
    const currentList = useSelector(selectCurrentList);
    const allFriends = useSelector(selectAllFriends);
    const pendingRequests = useSelector(selectPendingRequest);
    const [list, setList] = useState(allFriends);

    useEffect(() => {
        const onLoadFriendList = async () => {
            if (user) {
                await dispatch(getPendingRequestList(user.uid) as any);
                await dispatch(getFriendList(user.uid) as any)
                if (currentList === 'all') {
                    setList(allFriends);
                    console.log(allFriends);
                } else if (currentList === 'pending') {
                    setList(pendingRequests);
                }
            }
        };
        onLoadFriendList();
    }, [user, currentList])
    
    let mainContent;
    if (list) {
        mainContent = list.map((item: any) => {
            return(
                <UserBox key={item.email}>
                    <Box display="flex" gap="10px" alignItems="center">
                        <Avatar />
                        <Typography padding="0">{item.email}</Typography>
                    </Box>
                    <Box display="flex">
                        {currentList === 'pending' ? (
                            <>
                                <IconButton
                                    onClick={() => {
                                        const payload = {
                                            uid: user?.uid,
                                            email: item.email,
                                        }
                                        dispatch(acceptFriendRequest(payload) as any)}
                                    }
                                >
                                    <CheckCircleRoundedIcon/>
                                </IconButton>
                                <IconButton>
                                    <CancelRoundedIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <IconButton>
                                    <AddCommentRoundedIcon />
                                </IconButton>
                                <IconButton>
                                    <PersonRemoveAlt1RoundedIcon />
                                </IconButton>
                            </>
                        )}
                    </Box>
                </UserBox>
            )
        })
    } else {
        mainContent = <p>Nothing to show here</p>;
    }

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
        {/* Title */}
        <Box paddingY="20px">
            <Title content="online" />
        </Box>

        {/* Main */}
        <Box sx={boxStyle}>
            {mainContent}
        </Box>
    </Box>
  )
}

export default FriendsPage