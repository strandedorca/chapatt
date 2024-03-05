import { createSlice } from "@reduxjs/toolkit/react";
import { addDoc, collection, doc, query, orderBy, onSnapshot, limit, Unsubscribe } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Message } from "../types";
import { AppDispatch, RootState } from "../main";

interface messagesSliceType {
    messages: Message[],
    unsubscribe: Unsubscribe | undefined,
    show: boolean,
}

const initialState: messagesSliceType = {
    messages: [],
    unsubscribe: undefined,
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

interface sendMessage {
    from: string,
    to: string | undefined,
    content: string,
}

export const sendMessageToUser = (payload: sendMessage) => {
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

export const subscribeToMessages = ({ username1, username2 }: { username1: string, username2: string | undefined }) => {
    return async (dispatch: AppDispatch) => {
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

export const { setConversation } = messagesSlice.actions;
export const selectAllMessagesWithUser = (state: RootState) => (state.messages.messages);
export const selectShow = (state: RootState) => (state.messages.show);
export default messagesSlice.reducer;