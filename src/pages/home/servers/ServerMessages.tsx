import { IconButton, TextField, FormControl } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import GifBoxRoundedIcon from "@mui/icons-material/GifBoxRounded";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@emotion/react";
import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  selectAllMessagesWithUser,
  selectShow,
  sendMessageToUser,
  subscribeToMessages,
} from "../../../redux-slices/messagesSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../../types";
import { unsubscribe } from "diagnostics_channel";
import { selectCurrentUser } from "../../../redux-slices/currentUserSlice";
import { CircularProgress } from "@material-ui/core";
import SingleMessage from "./../main-huyen/SingleMessage.tsx";
import {
  selectMessagesFromServer,
  sendMessageToServer,
  subscribeToServerMessages,
} from "../../../redux-slices/serverSlice.tsx";

const ServerMessages = () => {
  const dispatch = useDispatch();
  const theme: any = useTheme();
  const [message, setMessage] = useState("");
  const messages = useSelector(selectMessagesFromServer);

  // currentUser (sender)
  const currentUser = useSelector(selectCurrentUser);
  const serverName = useParams().serverName;

  // Update messages real time
  useEffect(() => {
    let unsubscriber;
    const fetchMessages = async () => {
      try {
        if (serverName) {
          unsubscriber = await dispatch(
            subscribeToServerMessages(serverName) as any
          );
          return () => {
            // Unsubscribe from messages when the component unmounts
            unsubscriber();
          };
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }
    if (currentUser) {
      const from = currentUser.username;
      const to = serverName;
      const content = message;
      dispatch(sendMessageToServer({ from, to, content }) as any);
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
        sx={{ backgroundColor: theme.palette.background.paper }}
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
