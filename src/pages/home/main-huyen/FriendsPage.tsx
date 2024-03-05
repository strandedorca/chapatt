import { Box, styled } from "@mui/system";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Title from "../../../components/Title";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import AddCommentRoundedIcon from "@mui/icons-material/AddCommentRounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    acceptFriendRequest,
    deleteFriend,
    refuseFriendRequest,
    selectAllFriends,
    selectBlocked,
    selectCurrentList,
    selectPending,
    subscribeToFriendList,
    unblockFriend,
} from "../../../redux-slices/friendsSlice.tsx";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { selectCurrentUser } from "../../../redux-slices/currentUserSlice.tsx";
import { useNavigate } from "react-router-dom";
import AutoModeRoundedIcon from "@mui/icons-material/AutoModeRounded";
import BlockModal from "../../../components/BlockModal.tsx";
import { AppDispatch } from "../../../main.tsx";
import ConfirmationDialog from "../../../components/ConfirmationDialog.tsx";
import { toast } from "react-toastify";
import Toast from "../../../components/Toast.tsx";
import { Unsubscribe } from "firebase/auth";
import styles from './../Home.module.css';

const SearchBar = styled("input")(({ theme }) => ({
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
    overflowY: "scroll"
};
const UserBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderTop: "1px white solid",
});

const FriendsPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const currentList = useSelector(selectCurrentList);
    const currentUser = useSelector(selectCurrentUser);
    const username = currentUser.username;
    const allFriends = useSelector(selectAllFriends);
    const pendingFriends = useSelector(selectPending);
    const blockedFriends = useSelector(selectBlocked);
    const [blockModalOpen, setBlockModalOpen] = useState(false);
    const [deleteFriendModalOpen, setDeleteFriendModalOpen] = useState(false);
    const notify = (input: string) => {
        switch (input) {
            case 'BLOCK_SUCCESS':
                toast.success("Block user successfully");
                break;
            case 'BLOCK_FAILED':
                toast.error("Failed to block. Please try again");
                break;
            case 'ADD_SUCCESS':
                toast.success("Friend request sent successfully");
                break;
            case 'ADD_FAILED':
                toast.error("Failed to send friend request. Please try again");
                break;
            case 'DELETE_SUCCESS':
                toast.success("Delete friend successfully");
                break;
            case 'DELETE_FAILED':
                toast.error("Failed to delete friend. Please try again");
                break;
            case 'UNBLOCK_SUCCESs':
                toast.success("Unblock user successfully");
                break;
            case 'UNBLOCK_FAILED':
                toast.error("Failed to unblock user. Please try again");
                break;
            case 'ACCEPT_SUCCESS':
                toast.success("You've got a new friend!");
                break;
            case 'ACCEPT_FAILED':
                toast.error("Failed to accept friend request. Please try again");
                break;
            case 'REFUSE_SUCCESS':
                toast.success("Refused request successfully. Do you hate them or they just aren't your friend?");
                break;
            case 'REFUSE_FAILED':
                toast.error("Failed to refuse friend request. Please try again");
                break;
            default:
                toast.error("An unknown error occurred. Please try again.");
                break;
        }
    }

    // Update friend list (subscribe)
    useEffect(() => {
        let unsubscriber: Unsubscribe | undefined;
        const updateFriendList = async () => {
            try {
                unsubscriber = await dispatch(subscribeToFriendList(username));
                // console.log('Subscribe to friend list successfully');
            } catch (error) {
                console.log(error);
            }
        }
        updateFriendList();
        return () => {
            if (unsubscriber) {
                unsubscriber();
            }
            // console.log('Unsubscribed from friend list successfully');
        }
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
    const handleBlockModalOpen = () => { setBlockModalOpen(true) };
    const handleBlockModalClose = () => { setBlockModalOpen(false) };
    const handleDeleteFriendModalOpen = () => { setDeleteFriendModalOpen(true) }
    const handleDeleteFriendModalClose = () => { setDeleteFriendModalOpen(false) }

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
                                        username,
                                        senderUsername: friendUsername
                                    }
                                    dispatch(acceptFriendRequest(payload))
                                        .then(() => notify("ACCEPT_SUCCESS"))
                                        .catch(() => notify("ACCEPT_FAILED"))
                                }}
                            >
                                <CheckCircleRoundedIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    const payload = {
                                        username,
                                        senderUsername: friendUsername
                                    }
                                    dispatch(refuseFriendRequest(payload))
                                        .then(() => notify("REFUSE_SUCCESS"))
                                        .catch(() => notify("REFUSE_FAILED"))
                                }}>
                                <CancelRoundedIcon />
                            </IconButton>
                        </>
                    ) : (currentList === 'friends') ? (
                        <>
                            <IconButton
                                onClick={() => {
                                    navigate(`/me/${friendUsername}`)
                                }}
                            >
                                <AddCommentRoundedIcon />
                            </IconButton>

                            {/* Delete Friend confirmation dialog */}
                            <ConfirmationDialog
                                openState={deleteFriendModalOpen}
                                handleClose={handleDeleteFriendModalClose}
                                handleCancel={handleDeleteFriendModalClose}
                                handleConfirm={() => {
                                    dispatch(deleteFriend({ username, friendUsername }))
                                        .then(() => {
                                            handleDeleteFriendModalClose();
                                            notify("DELETE_SUCCESS")
                                        })
                                        .catch((error) => {
                                            notify("DELETE_FAILED");
                                            console.log(error);
                                        });

                                }}
                            />
                            <IconButton
                                onClick={handleDeleteFriendModalOpen}
                            >
                                <PersonRemoveAlt1RoundedIcon />
                            </IconButton>
                        </>
                    ) : (
                        <IconButton>
                            <AutoModeRoundedIcon
                                onClick={() => {
                                    const payload = {
                                        blockedUsername: friendUsername,
                                        username: currentUser.username,
                                    }
                                    dispatch(unblockFriend(payload))
                                        .then(() => notify("UNBLOCK_SUCCESs"))
                                        .catch(() => notify("UNBLOCK_FAILED"));
                                }}
                            />
                        </IconButton>
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
            {currentList === 'friends' &&
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
            }

            {/* Modals */}
            {currentList === 'blocked' &&
                <BlockModal modalOpen={blockModalOpen} handleClose={handleBlockModalClose} />
            }
            <Toast />

            {/* Title */}
            {/* Block Button */}
            <Box paddingY="20px" display='flex' alignItems='center' gap="20px" justifyContent="space-between">
                <Title content={title} />
                {currentList === 'blocked' &&
                    <Button
                        variant="contained"
                        sx={{ width: "10rem" }}
                        onClick={handleBlockModalOpen}>
                        Block a user
                    </Button>}
            </Box>

            {/* Main */}
            <Box sx={boxStyle} className={styles.hiddenScroll}>
                {mainContent}
            </Box>
        </Box>
    );
};

export default FriendsPage;
