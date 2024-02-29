import { createSlice } from "@reduxjs/toolkit/react";
import { addDoc, collection, doc, serverTimestamp, getDocs, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Message } from "../types";

const initialState: any = {
    messages: [],
    unsubscribe: null,
    show: false,
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setConversation(state, action) {
            state.messages = action.payload;
        },
    }
})

export const sendMessageToUser = (payload: any) => {
    // payload: from: username, to: username, content: string
    return async () => {
        const { from, to, content } = payload;
        // Get ref to conversation
        const sortedUsernames = [from, to].sort();
        const conversationId = `${sortedUsernames[0]}_${sortedUsernames[1]}`;
        const documentRef = doc(db, 'direct-messages', conversationId);
        // Get ref to subcollection inside the conversation doc
        const messagesRef = collection(documentRef, 'messages');
        await addDoc(messagesRef, {
            from,
            content,
            createdAt: new Date(),
        })
    }
}

export const subscribeToMessages = ({ username1, username2 }: any) => {
    return async (dispatch: any) => {
        // Get ref to conversation
        const sortedUsernames = [username1, username2].sort();
        const conversationId = `${sortedUsernames[0]}_${sortedUsernames[1]}`;
        const documentRef = doc(db, 'direct-messages', conversationId);
        // Get ref to subsollection inside the conversation doc
        const messagesRef = collection(documentRef, 'messages');
        // Create a query
        const messagesQuery = query(
            messagesRef,
            orderBy('createdAt', 'asc'),
            limit(50),
        )
        const unsubscriber = onSnapshot(messagesQuery, (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => {
                return ({
                    ...doc.data(),
                    id: doc.id,
                })
            });
            dispatch(setConversation(messages));
        });
        return unsubscriber;
    }
}

// export const getConversation = ({ uid1, uid2 }: any) => {
//     return async (dispatch: any) => {
//         const sortedUid = [uid1, uid2].sort();
//         const conversationId = `${sortedUid[0]}_${sortedUid[1]}`;
//         const documentRef = doc(db, 'direct-messages', conversationId);
//         const querySnapshot = await getDocs(
//             query(collection(documentRef, 'messages'), orderBy('createdAt'))
//         );
//         const messages: Message[] = [];
//         querySnapshot.forEach((doc) => {
//             messages.push(doc.data() as Message);
//         })
//         console.log(messages);
//         dispatch(setConversation(messages));
//     }
// }



export const { setConversation } = messagesSlice.actions;
export const selectAllMessagesWithUser = (state: any): any => (state.messages.messages);
export const selectShow = (state: any): any => (state.messages.show);
export default messagesSlice.reducer;