import { IconButton, Button, TextField } from "@mui/material"
import { Box, styled } from "@mui/system"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import GifBoxRoundedIcon from '@mui/icons-material/GifBoxRounded';
import Message from "./Message";
import { useTheme } from "@emotion/react";

const Messages = () => {
    const theme: any = useTheme();
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
            padding="20px"
            paddingRight="0"
        >
            {/* Messages Sent */}
            <Box id="messages" sx={{ 
                flexGrow: "1", 
                overflowY: "scroll",
                mb: "15px",
            }}>
                {fakeMessages.map(message => {
                    return <Message 
                        key={message.content} 
                        name={message.from} 
                        timestamp={message.timestamp} 
                        content={message.content}
                    />
                })}
            </Box>
            {/* Message Input */}
            <Box 
                id="input" 
                width="100%"
                display="flex"
                borderRadius="8px"
                padding="10px"
                sx={{ backgroundColor: theme.palette.background.paper }}
            >
                <IconButton>
                    <AddCircleRoundedIcon />
                </IconButton>
                <TextField variant="standard" type="text" placeholder="Enter message" fullWidth/>
                <IconButton>
                    <GifBoxRoundedIcon />
                </IconButton>
                <IconButton>
                    <AddReactionRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Messages