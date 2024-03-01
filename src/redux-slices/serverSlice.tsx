import { createSlice } from "@reduxjs/toolkit/react";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { setConversation } from "./messagesSlice";
import { usernameExistsPromise } from "../components/helper-functions";

const initialState: any = {
    serverName: '',
    members: [],
    message: [],
};

const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        setServer(state, action) {
            state.serverName = action.payload.serverName
            state.members = action.payload.members;
            state.messages = action.payload.messages;
            console.log(state);
        }
    }
})

export const addNewServer = (payload: any) => {
    // payload: serverName + username
    return async (dispatch: any) => {
        try {
            const { serverName, username } = payload;
            if (serverName) {
                const serverCollectionRef = collection(db, 'servers');

                // Add a new server to collection `servers`
                await setDoc(doc(serverCollectionRef, serverName), {
                    members: [username],
                    messages: [],
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchServerData = (serverName: string) => {
    return async (dispatch: any) => {
        const serverRef = doc(db, 'servers', serverName);
        const snap = await getDoc(serverRef);
        if (snap.exists()) {
            console.log(snap.data());
            dispatch(setServer(snap.data()));
        }
    }
}

export const subscribeToServerMessages = (serverName: string) => {
    return async (dispatch: any) => {
        if (serverName) {
            // Get ref to server
            const documentRef = doc(db, 'servers', serverName);
            // Subscribe to the server document
            try {
                const unsubscriber = onSnapshot(documentRef, (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        dispatch(setServer(data.messages));
                    } else {
                        console.log("Server document doesn't exist");
                    }
                });
                // To unsubscribe later
                return unsubscriber;
            } catch (error) {
                console.log('Failed to subscribe to document.', error);
            }
        }
    }
}

export const joinAServer = (payload: any) => {
    // payload: serverName + username
    return async (dispatch: any) => {
        const { serverName, username } = payload
        try {
            const serverRef = doc(db, 'servers', serverName);
            await updateDoc(serverRef, {
                members: arrayUnion(username)
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const leaveServer = (payload: any) => {
    // payload: serverName + username
    return async () => {
        const { serverName, username } = payload
        try {
            const serverRef = doc(db, 'servers', serverName);
            await updateDoc(serverRef, {
                members: arrayRemove(username)
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export const sendMessageToServer = (payload: any) => {
    // payload: from: username, content: string
    return async () => {
        try {
            const { from, to, content } = payload;
            // Get ref to server
            const documentRef = doc(db, 'servers', to);
            const message = {
                from,
                content,
                createdAt: new Date(),
            }
            // Add sender to pending friends
            await updateDoc(documentRef, {
                messages: arrayUnion(message)
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export const selectMembersFromServer = (state: any) => (state.server.members);
export const selectMessagesFromServer = (state: any) => (state.server.messages);

export const { setServer } = serverSlice.actions;
export default serverSlice.reducer