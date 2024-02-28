import { IconButton, TextField, FormControl } from "@mui/material"
import { Box } from "@mui/system"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import GifBoxRoundedIcon from '@mui/icons-material/GifBoxRounded';
import SendIcon from '@mui/icons-material/Send';
import SingleMessage from "./SingleMessage";
import { useTheme } from "@emotion/react";
import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getConversation, selectAllMessagesWithUser, sendMessageToUser, subscribeToMessages, unsubscribeFromMessages } from "../../../redux-slices/messagesSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../../types";
import { unsubscribe } from "diagnostics_channel";

const Messages = () => {
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const theme: any = useTheme();
    const [message, setMessage] = useState('');
    const { uid } = useParams();
    //     {
    //         from: 'user1',
    //         timestamp: "Today at 3:51 AM",
    //         content: 'Hello there!',
    //     },
    //     {
    //         from: 'user2',
    //         timestamp: "Today at 3:51 AM",
    //         content: 'Hi, how are you?',
    //     },
    //     {
    //         from: 'user1',
    //         timestamp: "Today at 3:51 AM",
    //         content: 'I\'m good, thanks! How about you?',
    //     },
    //     {
    //         from: 'user2',
    //         timestamp: "Today at 3:51 AM",
    //         content: 'I\'m doing well too. Just busy with work.',
    //     },
    //     {
    //         from: 'user1',
    //         timestamp: "Today at 3:51 AM",
    //         content: 'That sounds hectic. Hope you get some rest soon.',
    //     },
    //     {
    //         from: 'user2',
    //         timestamp: "Today at 3:51 AM",
    //         content: 'Thanks! Yeah, looking forward to the weekend.',
    //     },
    //     {
    //         from: 'user1',
    //         timestamp: "Today at 3:51 AM",
    //         content: 'Same here! Any plans for the weekend?',
    //     },
    //     // {
    //     //     from: 'user2',
    //     //     timestamp: "Today at 3:51 AM",
    //     //     content: 'Not really, just relaxing at home. How about you?',
    //     // },
    //     // {
    //     //     from: 'user1',
    //     //     timestamp: "Today at 3:51 AM",
    //     //     content: 'I might go for a hike if the weather is nice.',
    //     // },
    //     // {
    //     //     from: 'user2',
    //     //     timestamp: "Today at 3:51 AM",
    //     //     content: 'Sounds like a great plan!',
    //     // },
    // ];
    const messages = useSelector(selectAllMessagesWithUser);
    
    useEffect(() => {
        if (user) {
            const onLoadMessages = () => {
                const uids = {
                    uid1: user.uid,
                    uid2: uid,
                }
                dispatch(subscribeToMessages(uids) as any);
            };
            onLoadMessages();
        }
        return () => {
            dispatch(unsubscribeFromMessages() as any);
            // dispatch(clearUnsubscribe() as any)
        }
    }, [user, uid])

    const handleSubmit = async (e: any ) => {
        e.preventDefault();
        if (message.trim() === '') {
            return;
        }
        if (user) {
            const from = user.uid;
            const to = uid;
            const content = message;
            dispatch(sendMessageToUser({ from, to, content }) as any);
        }
        setMessage('');
    }

    return (
        <Box
            height="100%" 
            display="flex"
            flexDirection="column"
            padding="20px"
            paddingRight="0"
        >
            {/* Show Previous Messages */}
            <Box id="messages" sx={{ 
                flexGrow: "1", 
                overflowY: "scroll",
                mb: "15px",
            }}>
                {messages.map((message: Message) => {
                    let sender = message.from;
                    if (message.from !== user?.uid && uid) {
                        sender = uid;
                    }
                    return (
                        <SingleMessage 
                            key={message.content} 
                            from={sender} 
                            timestamp={message.createdAt} 
                            content={message.content}
                        />
                    );
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
                {/* File Sharing Button */}
                <IconButton>
                    <AddCircleRoundedIcon />
                </IconButton>

                {/* Input */}
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

                {/* Sent Button */}
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