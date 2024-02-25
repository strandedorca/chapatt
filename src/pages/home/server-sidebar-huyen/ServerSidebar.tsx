import { styled } from "@material-ui/core"
import { Button } from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Avatar, Box, Divider, IconButton } from "@mui/material"
import avatar from './../../../assets/avatar.jpg';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CustomTooltip from "../../../components/CustomTooltip";
import { useLocation, useNavigate } from "react-router";
import Title from "../../../components/Title";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Channel } from "../../../types";
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';

const SearchField = styled('input')({
    border: "none",
    width: "100%",
    padding: "2px 5px",
    fontSize: ".9em"
})

const NavButton = styled(Button)(({ theme }) =>({
    border: "none",
    borderRadius: "5px",
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "15px",
    width: "100%",
    padding: "10px",
    "&:hover": {
    }
}));

const ServerSidebar = ({ users }: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    let content;

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

    if (location.pathname === "/me") {
        content = (
            <Box>
                {/* SearchBar */}
                <Box sx={{ height: "48px", borderBottom: "1px white solid"}} padding="10px">
                    <SearchField placeholder="Find or start a conversation"/>
                </Box>
                <Box padding="10px" >
                    <NavButton onClick={() => {
                        navigate('/me')
                    }}>
                        <PeopleAltIcon />
                        Friends
                    </NavButton>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Title content="Direct messages" />
                        <CustomTooltip title="Create DM">
                            <NavButton style={{ width: "auto" }}>+</NavButton>
                        </CustomTooltip>
                    </Box>
                    <Box>
                        {users.map((user: any) => (
                            <NavButton key={user.id} onClick={() => { navigate(`/conversations/${user.id}`) }}>
                                <Avatar sx={{ width: "32px", height: "32px" }}/>
                                <div>{user.name}</div>
                            </NavButton>
                        ))}
                    </Box>
                </Box>
            </Box>
        )
    }  else {
        content = (
            <Box padding="10px">
                <NavButton onClick={() => {
                    navigate('/i')
                }}>
                    <InfoRoundedIcon />
                    <div>Information</div>
                </NavButton>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Title content="Text Channels" />
                    <CustomTooltip title="New text channel">
                        <NavButton style={{ width: "auto" }}>+</NavButton>
                    </CustomTooltip>
                </Box>
                {textChannels.map((channel: Channel) => {
                    return (
                        <NavButton onClick={() => {
                            navigate(`${channel.id}`)
                        }}>
                            <TagRoundedIcon />
                            <div>Information</div>
                        </NavButton>
                    )
                })}

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Title content="Voice Channels" />
                    <CustomTooltip title="New voice channel">
                        <NavButton style={{ width: "auto" }}>+</NavButton>
                    </CustomTooltip>
                </Box>
                {voiceChannels.map((channel: Channel) => {
                    return (
                        <NavButton onClick={() => {
                            navigate(`${channel.id}`)
                        }}>
                            <VolumeDownRoundedIcon />
                            <div>{channel.name}</div>
                        </NavButton>
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
    >
        {/* Main */}
        {content}
        {/* Footer - always shown */}
        <Box sx={{
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Box display="flex" gap="10px" alignItems="center">
                <Avatar sx={{ width: "32px", height: "32px" }} src={avatar}/>
                <div>
                    <div>strandedorca</div>
                    <div>Invisible</div>
                </div>
            </Box>
            <IconButton onClick={() => { navigate("/settings")}}>
                <SettingsRoundedIcon />
            </IconButton>
        </Box>
    </Box>
  )
}

export default ServerSidebar