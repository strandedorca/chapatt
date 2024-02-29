import { Box, styled } from "@mui/system";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Title from "../../../components/Title";
import { User } from './../../../types.tsx';
import { Avatar, IconButton, Typography } from "@mui/material";
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import PersonRemoveAlt1RoundedIcon from '@mui/icons-material/PersonRemoveAlt1Rounded';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriendRequest, getFriendsList, selectAllFriends, selectBlocked, selectCurrentList, selectPending } from "../../../redux-slices/friendsSlice.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase.ts";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { selectCurrentUser } from "../../../redux-slices/currentUserSlice.tsx";
import { current } from "@reduxjs/toolkit";

const SearchBar = styled('input')(({ theme }) => ({
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

const FriendsPage = () => {
    const dispatch = useDispatch();
    const currentList = useSelector(selectCurrentList);
    const currentUser = useSelector(selectCurrentUser);
    const allFriends = useSelector(selectAllFriends);
    const pendingFriends = useSelector(selectPending);
    const blockedFriends = useSelector(selectBlocked);

    // Update friend list
    useEffect(() => {
        dispatch(getFriendsList(currentUser.username) as any);
    }, [currentUser, currentList])

    let list, title;
    if (currentList === 'friends') {
        title = 'all';
        list = allFriends;
    } else if (currentList === 'pending') {
        title = 'pending';
        list = pendingFriends;
    } else {
        title = 'blocked';
        list = blockedFriends;
    }

    let mainContent = list.map((friendUsername: any) => {
        return (
            <UserBox key={friendUsername}>
                <Box display="flex" gap="10px" alignItems="center">
                    <Avatar />
                    <Typography padding="0">{friendUsername}</Typography>
                </Box>
                <Box display="flex">
                    {currentList === 'pending' ? (
                        <>
                            <IconButton
                                onClick={() => {
                                    const payload = {
                                        username: currentUser.username,
                                        senderUsername: friendUsername
                                    }
                                    dispatch(acceptFriendRequest(payload) as any)
                                }}
                            >
                                <CheckCircleRoundedIcon />
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
                    sx={{
                        position: "absolute",
                        top: "26px",
                        right: "40px"
                    }}
                />
            </Box>
            {/* Title */}
            <Box paddingY="20px">
                <Title content={title} />
            </Box>

            {/* Main */}
            <Box sx={boxStyle}>
                {mainContent}
            </Box>
        </Box>
    )
}

export default FriendsPage