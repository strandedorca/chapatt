import { IconButton, TextField, FormControl } from "@mui/material"
import { Box } from "@mui/system"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import GifBoxRoundedIcon from '@mui/icons-material/GifBoxRounded';
import SendIcon from '@mui/icons-material/Send';
import Message from "./Message";
import { useTheme } from "@emotion/react";
import { FormEvent, MouseEventHandler, useState } from "react";
import { auth, db } from "../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Messages = () => {
    const theme: any = useTheme();
    const [message, setMessage] = useState('');
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
    const handleSubmit = async (e: any ) => {
        e.preventDefault();
        if (message.trim() === '') {
            return;
        }
        if (auth.currentUser) {
            const { uid, email, photoURL } = auth.currentUser;
            await addDoc(collection(db, 'messages'), {
                text: message,
                email: email,
                avatar: photoURL,
                createdAt: serverTimestamp(),
                uid,
            });
        }
        setMessage("");
    }

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
                <form 
                    style={{ width: "100%", marginRight: "5px" }}
                    onSubmit={e => { handleSubmit(e) }}
                >
                    <TextField
                        id="messageInput"
                        name="messageInput"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Enter message"
                        variant="standard"
                        fullWidth
                    />
                </form>
                <IconButton onClick={e => { handleSubmit(e) }}>
                    <SendIcon />
                </IconButton>
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