import { styled } from "@mui/system";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Avatar, Box, IconButton, Modal } from "@mui/material"
import avatar from './../../../assets/avatar.jpg';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CustomTooltip from "../../../components/CustomTooltip";
import { useLocation, useNavigate } from "react-router";
import Title from "../../../components/Title";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Channel } from "../../../types";
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import { useTheme } from "@emotion/react";
import { TextField } from "@mui/material";

import ConversationsNavigationItem from "./ConversationsNavigationItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase/firebase";
import EllipsisOverflowDiv from "../../../components/EllipsisOverflowDiv";
import { useSelector } from "react-redux";
import { selectAllFriends } from "../../../redux-slices/friendsSlice";
import { query, collection, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const Button = styled('button')(({ theme }) => ({
    fontFamily: 'Inter',
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
    '&:hover': {
        backgroundColor: theme.palette.background.default,
    }
}));

const ServerSidebar = ({ users }: any) => {
    const theme: any = useTheme();
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState<any>([]);
    let content;

    const allFriends = useSelector(selectAllFriends);

    useEffect(() => {
        console.log(userInfo);
        allFriends.map(async (friendUsername: any) => {
            try {
                const userQuery = query(
                    collection(db, 'users'),
                    where('username', '==', friendUsername),
                )
                const userSnap = await getDocs(userQuery);
                if (!userSnap.empty) {
                    setUserInfo((prevUserInfo: any) => [
                        ...prevUserInfo,
                        {
                            displayName: userSnap.docs[0].data().displayName,
                            username: userSnap.docs[0].data().username,
                            photoURL: userSnap.docs[0].data().photoURL,
                        }
                    ])
                } else {
                    console.log("Username doesn't exist");
                }
            } catch (error) {
                console.error('Error retrieving user information.', error);
            }
        });
        return () => { setUserInfo([]) };
    }, [user, allFriends])

    // console.log(allFriends, userInfo);

    // PLACEHOLDER
    const channels: Channel[] = [
        {
            type: "voice",
            name: "ABC",
            id: "1"
        },
        {
            type: "text",
            name: "BCD",
            id: "2"
        },
        {
            type: "text",
            name: "BCD",
            id: "3"
        },
        {
            type: "voice",
            name: "BCD",
            id: "4"
        },
    ]
    const textChannels = channels.filter(channel => channel.type === "text");
    const voiceChannels = channels.filter(channel => channel.type === "voice");

    // Check pathname to show different UI
    if (location.pathname.startsWith("/me")) {
        content = (
            <Box>
                {/* SearchBar */}
                <Box padding="10px">
                    <TextField
                        variant="standard"
                        placeholder="Find or start a conversation" fullWidth
                        size="small"
                    />
                </Box>

                <Box padding="10px" >
                    {/* Friends Button */}
                    <Button onClick={() => {
                        navigate('/me')
                    }}>
                        <PeopleAltIcon />
                        Friends
                    </Button>
                    {/* Title + Add message button */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Title content="Direct messages" />
                        <CustomTooltip title="Create DM">
                            <Button style={{ width: "auto" }}>+</Button>
                        </CustomTooltip>
                    </Box>
                    {/* Conversations */}
                    <Box>
                        {userInfo.map((user: any) => (
                            <ConversationsNavigationItem
                                key={user.username}
                                username={user.username}
                                displayName={user.displayName}
                                photoUrl={user.photoUrl}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        )
    } else {
        content = (
            <Box padding="10px">
                <Button onClick={() => {
                    navigate('/i')
                }}>
                    <InfoRoundedIcon />
                    <div>Information</div>
                </Button>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Title content="Text Channels" />
                    <CustomTooltip title="New text channel">
                        <Button style={{ width: "auto" }}>+</Button>
                    </CustomTooltip>
                </Box>
                {textChannels.map((channel: Channel) => {
                    return (
                        <Button onClick={() => {
                            navigate(`${channel.id}`)
                        }}>
                            <TagRoundedIcon />
                            <div>Information</div>
                        </Button>
                    )
                })}

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Title content="Voice Channels" />
                    <CustomTooltip title="New voice channel">
                        <Button sx={{ width: "auto" }}>+</Button>
                    </CustomTooltip>
                </Box>
                {voiceChannels.map((channel: Channel) => {
                    return (
                        <Button onClick={() => {
                            navigate(`${channel.id}`)
                        }}>
                            <VolumeDownRoundedIcon />
                            <div>{channel.name}</div>
                        </Button>
                    )
                })}
            </Box>
        )
    }

    return (
        <Box
            height="100%"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            sx={{
                backgroundColor: theme.palette.background.paper,
            }}
        >
            {/* Main */}
            {content}
            {/* Footer - always shown */}
            <Box sx={{
                paddingX: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.background.default,
                height: '60px'
            }}>
                <Box display="flex" gap="10px" alignItems="center"
                    sx={{ width: '170px' }}>
                    <Avatar sx={{ width: "32px", height: "32px" }} src={user?.photoURL as any} />
                    <EllipsisOverflowDiv>
                        <EllipsisOverflowDiv>{user?.displayName}</EllipsisOverflowDiv>
                        <EllipsisOverflowDiv>{user?.email}</EllipsisOverflowDiv>
                    </EllipsisOverflowDiv>
                </Box>
                <IconButton onClick={() => { navigate("/settings") }}>
                    <SettingsRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default ServerSidebar