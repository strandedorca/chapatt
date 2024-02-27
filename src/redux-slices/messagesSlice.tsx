import { createSlice } from "@reduxjs/toolkit/react";
import { addDoc, collection, doc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Message } from "../types";

const initialState: any = [];

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setConversation(state, action) {
            return action.payload;
        },
    }
})

export const getConversation = ({ uid1, uid2 }: any) => {
    return async (dispatch: any) => {
        const sortedUid = [uid1, uid2].sort();
        const conversationId = `${sortedUid[0]}_${sortedUid[1]}`;
        const documentRef = doc(db, 'direct-messages', conversationId);
        const querySnapshot = await getDocs(
            query(collection(documentRef, 'messages'), orderBy('createdAt'))
        );
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
export const selectAllMessagesWithUser = (state: any) : any => (state.messages);
// export const selectMessageByIdWithUser = (state: any) : any => (state.messages.mid);
export default messagesSlice.reducer;