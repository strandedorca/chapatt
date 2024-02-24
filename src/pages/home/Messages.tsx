import { TextField } from "@mui/material"
import { Box, styled } from "@mui/system"
import { Button } from "react-bootstrap"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import GifBoxRoundedIcon from '@mui/icons-material/GifBoxRounded';
import Message from "./Message";

const Messages = () => {
    const TransparentBtn = styled(Button)({
        backgroundColor: "transparent",
        border: "none",
        "&:hover": {
            backgroundColor: "transparent",
            border: "none",
        },
        "&:active": {
            backgroundColor: "transparent",
            border: "none",
        }
    })
    const TransparentInput = styled('input')({
        backgroundColor: "transparent",
        border: "none",
        flexGrow: "1",
        "&:focus": {
            border: "none",
        }
    })
    const fakeMessages = [
        {
            from: 'user1',
            timestamp: "Today at 3:51 AM",
            content: 'Hello there!',
        },
        {
            from: 'user2',
            timestamp: "Today at 3:51 AM",
            content: 'Hi, how are you?',
        },
        {
            from: 'user1',
            timestamp: "Today at 3:51 AM",
            content: 'I\'m good, thanks! How about you?',
        },
        {
            from: 'user2',
            timestamp: "Today at 3:51 AM",
            content: 'I\'m doing well too. Just busy with work.',
        },
        {
            from: 'user1',
            timestamp: "Today at 3:51 AM",
            content: 'That sounds hectic. Hope you get some rest soon.',
        },
        {
            from: 'user2',
            timestamp: "Today at 3:51 AM",
            content: 'Thanks! Yeah, looking forward to the weekend.',
        },
        {
            from: 'user1',
            timestamp: "Today at 3:51 AM",
            content: 'Same here! Any plans for the weekend?',
        },
        // {
        //     from: 'user2',
        //     timestamp: "Today at 3:51 AM",
        //     content: 'Not really, just relaxing at home. How about you?',
        // },
        // {
        //     from: 'user1',
        //     timestamp: "Today at 3:51 AM",
        //     content: 'I might go for a hike if the weather is nice.',
        // },
        // {
        //     from: 'user2',
        //     timestamp: "Today at 3:51 AM",
        //     content: 'Sounds like a great plan!',
        // },
    ];

    return (
        <Box
            height="100%" 
            display="flex"
            flexDirection="column"
            padding="20px 15px"
            sx={{ backgroundColor: "#313338" }}
        >
            <Box id="messages" sx={{ flexGrow: "1", overflowY: "scroll" }}>
                {fakeMessages.map(message => {
                    return <Message name={message.from} timestamp={message.timestamp} content={message.content}/>
                })}
            </Box>
            <Box 
                id="input" 
                width="100%"
                height="48px"
                display="flex"
                borderRadius="8px"
                sx={{ backgroundColor: "#383a40 "}}
            >
                <TransparentBtn>
                    <AddCircleRoundedIcon />
                </TransparentBtn>
                <TransparentInput type="text" placeholder="Enter message"/>
                <TransparentBtn>
                    <GifBoxRoundedIcon />
                </TransparentBtn>
                <TransparentBtn>
                    <AddReactionRoundedIcon />
                </TransparentBtn>
            </Box>
        </Box>
    )
}

export default Messages