import { createSlice } from "@reduxjs/toolkit/react";
import { addDoc, collection, doc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Message } from "../types";

const initialState: any = [];

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setConversation(state, action) {
            state = action.payload;
        }
    }
})

export const getConversation = ({ uid1, uid2 }: any) => {
    return async (dispatch: any) => {
        const sortedUid = [uid1, uid2].sort();
        const conversationId = `${sortedUid[0]}_${sortedUid[1]}`;
        const documentRef = doc(db, 'direct-messages', conversationId);
        const querySnapshot = await getDocs(collection(documentRef, 'messages'));
        const messages : Message[] = [];
        querySnapshot.forEach((doc) => {
            messages.push(doc.data() as Message);
        })
        console.log(messages);
        dispatch(setConversation(messages));
    }
}

export const sendMessageToUser = (payload: any) => {
    console.log(payload);
    return async () => {
        const { from, to, content } = payload;
        console.log(from, to, content);
        const sortedUid = [from, to].sort();
        const conversationId = `${sortedUid[0]}_${sortedUid[1]}`;
        const documentRef = doc(db, 'direct-messages', conversationId);
        const subCollectionRef = collection(documentRef, 'messages');
        await addDoc(subCollectionRef, {
            from,
            content,
            createdAt: serverTimestamp(),
        })
    }
}

export const { setConversation } = messagesSlice.actions;
export default messagesSlice.reducer;