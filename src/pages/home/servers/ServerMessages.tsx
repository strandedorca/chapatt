import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import GifBoxRoundedIcon from "@mui/icons-material/GifBoxRounded";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../../types";
import { selectCurrentUser } from "../../../redux-slices/currentUserSlice";
import SingleMessage from "./../main-huyen/SingleMessage.tsx";
import {
    selectMessagesFromServer,
    sendMessageToServer,
    subscribeToServer,
} from "../../../redux-slices/serverSlice.tsx";
import { Unsubscribe } from "firebase/auth";
import styles from './../Home.module.css';
import { AppDispatch } from "../../../main.tsx";
import { darkTheme } from "../../../theme.ts";

const ServerMessages = () => {
    const dispatch: AppDispatch = useDispatch();
    const [message, setMessage] = useState("");
    const messages = useSelector(selectMessagesFromServer);

    // currentUser (sender)
    const currentUser = useSelector(selectCurrentUser);
    const serverName = useParams().serverName;

    // Update messages real time
    useEffect(() => {
        let unsubscriber: Unsubscribe | undefined;
        const fetchMessages = async () => {
            try {
                if (serverName) {
                    unsubscriber = await dispatch(
                        subscribeToServer(serverName)
                    );
                    return () => {
                        // Unsubscribe from messages when the component unmounts
                        if (unsubscriber) {
                            unsubscriber();
                        }
                    };
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessages();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (message.trim() === "") {
            return;
        }
        if (currentUser) {
            const from = currentUser.username;
            const to = serverName;
            const content = message;
            dispatch(sendMessageToServer({ from, to, content }));
        }
        setMessage("");
    };

    return (
        <Box
            height="100%"
            display="flex"
            flexDirection="column"
            padding="20px"
            paddingRight="0"
        >
            {/* Show Previous Messages */}
            <Box
                id="messages"
                sx={{
                    flexGrow: "1",
                    overflowY: "scroll",
                    mb: "15px",
                }}
                className={styles.hiddenScroll}
            >
                {messages.map((message: Message) => {
                    let sender = message.from;
                    return (
                        <SingleMessage
                            key={message.id}
                            from={sender}
                            createdAt={message.createdAt}
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
                sx={{ backgroundColor: darkTheme.palette.background.paper }}
            >
                {/* File Sharing Button */}
                <IconButton>
                    <AddCircleRoundedIcon />
                </IconButton>

                {/* Input */}
                <form
                    style={{ width: "100%", marginRight: "5px" }}
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
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
                <IconButton
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                >
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
    );
};

export default ServerMessages;
