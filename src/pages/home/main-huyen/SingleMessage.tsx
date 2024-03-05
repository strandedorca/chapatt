import { Avatar } from "@mui/material"
import { Box } from "@mui/system"
import { Timestamp, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useEffect, useState } from "react";

interface MessageProp {
    from: string,
    content: string,
    createdAt: Timestamp,
}

const Message = ({ from, content, createdAt }: MessageProp) => {
    const [userInfo, setUserInfo] = useState({
        displayName: '',
        photoURL: '',
    })

    // Handle show different name and avatar from uid 
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const userQuery = query(
                    collection(db, 'users'),
                    where('username', '==', from),
                )
                const userSnap = await getDocs(userQuery);
                if (!userSnap.empty) {
                    setUserInfo({
                        displayName: userSnap.docs[0].data().displayName,
                        photoURL: userSnap.docs[0].data().photoURL,
                    });
                } else {
                    console.log("Username doesn't exist");
                }
            } catch (error) {
                console.error('Error retrieving user information.', error);
            }
        };

        getUserInfo();
    }, [from]);

    const formatDate = (timestamp: Timestamp) => {
        const date = timestamp.toDate();
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        // Format options
        const config: Intl.DateTimeFormatOptions = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        const timeConfig: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: '2-digit'
        }

        if (date.toDateString() === now.toDateString()) {
            return `Today at ${date.toLocaleTimeString('en-US', timeConfig)}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
            return `Yesterday at ${date.toLocaleTimeString('en-US', timeConfig)}`;
        } else {
            return `— ${date.toLocaleDateString('en-US', config)}`;
        }
    }

    return (
        <Box
            display="flex"
            gap="10px"
            marginBottom="25px"
            alignItems="center"
        >
            <Avatar src={userInfo.photoURL} />
            <div>
                <Box display="flex" gap="10px" alignItems="center">
                    <p style={{ fontWeight: "bold" }}>{userInfo.displayName}</p>
                    <p style={{ fontSize: ".8em" }}>{formatDate(createdAt)}</p>
                </Box>
                <p style={{ marginTop: "5px" }}>{content}</p>
            </div>
        </Box>
    )
}

export default Message