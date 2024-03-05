import { styled } from "@mui/system";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Avatar, Box, IconButton } from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CustomTooltip from "../../../components/CustomTooltip";
import { useLocation, useNavigate } from "react-router";
import Title from "../../../components/Title";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Channel } from "../../../types";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import ConversationsNavigationItem from "./ConversationsNavigationItem";
import EllipsisOverflowDiv from "../../../components/EllipsisOverflowDiv";
import { useDispatch, useSelector } from "react-redux";
import {
    getFriendInfo,
    selectAllFriends,
    subscribeToFriendList,
} from "../../../redux-slices/friendsSlice";
import {
    Unsubscribe,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { selectCurrentUser } from "../../../redux-slices/currentUserSlice";
import { AppDispatch } from "../../../main";
import styles from './../Home.module.css';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import { darkTheme } from "../../../theme";


export const Button = styled("button")(({ theme }) => ({
    fontFamily: "Inter",
    border: "none",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    color: "#fff",
    gap: "15px",
    fontSize: "1rem",
    width: "100%",
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: theme.palette.background.default,
    },
}));


interface FriendInfo {
    username: string;
    displayName: string;
    photoURL: string;
    status: string;
}
const ServerSidebar = () => {
    const currentUser = useSelector(selectCurrentUser);
    const username = currentUser.username;
    const [showInfo, setShowInfo] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [friendInfos, setFriendInfos] = useState<FriendInfo[]>([]);
    const allFriends = useSelector(selectAllFriends);
    const dispatch: AppDispatch = useDispatch();
    const clickMeStyle = {
        fontWeight: '500',
    }
    let content;


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
    }, [currentUser, subscribeToFriendList, dispatch])

    // Fetch user info
    useEffect(() => {
        const fetchFriendInfos = async () => {
            const friendInfoPromises = allFriends.map((username: string) => dispatch(getFriendInfo(username)));
            const responses = await Promise.all(friendInfoPromises);
            const friendInfos = responses.filter(userInfo => userInfo !== undefined) as FriendInfo[];
            setFriendInfos(friendInfos);
        };

        if (allFriends.length > 0) {
            fetchFriendInfos();
        }
    }, [allFriends]);

    // PLACEHOLDER
    const channels: Channel[] = [
        {
            type: "voice",
            name: "ABC",
            id: "1",
        },
        {
            type: "text",
            name: "BCD",
            id: "2",
        },
        {
            type: "text",
            name: "BCD",
            id: "3",
        },
        {
            type: "voice",
            name: "BCD",
            id: "4",
        },
    ];
    const textChannels = channels.filter((channel) => channel.type === "text");
    const voiceChannels = channels.filter((channel) => channel.type === "voice");

    // Check pathname to show different UI
    if (location.pathname.startsWith("/me")) {
        content = (
            <Box>
                <Box padding="10px">
                    {/* Friends Button */}
                    <Button
                        onClick={() => {
                            navigate("/me");
                        }}
                    >
                        <PeopleAltIcon />
                        Friends
                    </Button>
                    {/* Title + Add message button */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Title content="Direct messages" />
                        <CustomTooltip title="Create DM">
                            <Button style={{ width: "auto" }}>+</Button>
                        </CustomTooltip>
                    </Box>

                    {/* Conversations */}
                    <Box sx={{
                        overflowY: "scroll"
                    }}
                        className={styles.hiddenScroll}>
                        {friendInfos.map((user: FriendInfo) => (
                            <ConversationsNavigationItem
                                key={user.username}
                                username={user.username}
                                displayName={user.displayName}
                                photoURL={user.photoURL}
                                status={currentUser.status}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        );
    } else {
        content = (
            <Box padding="10px">
                <Button
                    onClick={() => setShowInfo((prev) => !prev)}
                >
                    <InfoRoundedIcon />
                    <div>Information</div>
                </Button>
                <Button
                    onClick={() => setShowInfo((prev) => !prev)}
                    style={clickMeStyle}
                >
                    <EmojiEmotionsRoundedIcon sx={{ color: 'white' }} />
                    <div>Click Me!</div>
                </Button>
                <Box sx={{ fontSize: '.9em', my: '10px', color: darkTheme.palette.primary.main }} display={showInfo ? 'block' : 'none'}>
                    This UI component isn't finished, we don't know yet what to show here. But we're leaving it there just for the sake of the appearance.
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Title content="Text Channels" />
                    <CustomTooltip title="New text channel">
                        <Button style={{ width: "auto" }}
                            onClick={() => setShowInfo((prev) => !prev)}
                        >+</Button>
                    </CustomTooltip>
                </Box>
                {textChannels.map((channel: Channel) => {
                    return (
                        <Button key={channel.id}
                            onClick={() => setShowInfo((prev) => !prev)}
                        >
                            <TagRoundedIcon />
                            <div>Information</div>
                        </Button>
                    );
                })}

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Title content="Voice Channels" />
                    <CustomTooltip title="New voice channel">
                        <Button sx={{ width: "auto" }}
                            onClick={() => setShowInfo((prev) => !prev)}
                        >+</Button>
                    </CustomTooltip>
                </Box>
                {voiceChannels.map((channel: Channel) => {
                    return (
                        <Button key={channel.id}
                            onClick={() => setShowInfo((prev) => !prev)}
                        >
                            <VolumeDownRoundedIcon />
                            <div>{channel.name}</div>
                        </Button>
                    );
                })}
            </Box>
        );
    }

    return (
        <Box
            height="100%"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            sx={{
                backgroundColor: darkTheme.palette.background.paper,
            }}
        >
            {/* Main */}
            {content}
            {/* Footer - always shown */}
            <Box
                sx={{
                    paddingX: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: darkTheme.palette.background.default,
                    height: "60px",
                }}
            >
                <Box
                    display="flex"
                    gap="10px"
                    alignItems="center"
                    sx={{ width: "170px" }}
                >
                    <Avatar
                        sx={{ width: "32px", height: "32px" }}
                        src={currentUser.photoURL as string}
                    />
                    <EllipsisOverflowDiv>
                        <EllipsisOverflowDiv>
                            {currentUser.displayName}
                        </EllipsisOverflowDiv>
                        <EllipsisOverflowDiv >
                            <Box
                                sx={{ color: darkTheme.palette.primary.main }}
                            >
                                {currentUser.status}
                            </Box>
                        </EllipsisOverflowDiv>
                    </EllipsisOverflowDiv>
                </Box>
                <IconButton
                    onClick={() => {
                        navigate("/settings");
                    }}
                >
                    <SettingsRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ServerSidebar;