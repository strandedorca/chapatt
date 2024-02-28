import { Avatar, CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useEffect, useState } from "react";

// TO BE ADDED
// interface

const Message = ({ from, content, timestamp }: any) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        username: '',
        photoURL: '',
    })
    // Handle timestamp
    // const timestampString = timestamp.toDate();

    // Handle show name and avatar from uid 
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                setLoading(true);
                const uid = from;
                const userRef = doc(db, 'users', uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUserInfo({
                        username: userSnap.data().displayName,
                        photoURL: userSnap.data().photoURL,
                    });
                    // console.log(username, photoURL);
                } else {
                    console.log("User doesn't exist");
                }
            } catch (error) {
                console.error('Error retrieving user information.', error);
            } finally {
                setLoading(false);
            }
        };

        getUserInfo();
    }, [from]);

    if (loading) {
        return;
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
                    <p style={{ fontWeight: "bold"}}>{userInfo.username}</p>
                    {/* <p style={{ fontSize: ".8em" }}>{timestamp}</p> */}
                </Box>
                <p style={{ marginTop: "5px" }}>{content}</p>
            </div>
        </Box>
    )
}

export default Message