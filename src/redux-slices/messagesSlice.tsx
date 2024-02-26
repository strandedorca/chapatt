import { createSlice } from "@reduxjs/toolkit/react";

const initialState: any = [];

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {

    }
})

export const getMessagesWithUser = ({ uid1, uid2 }: any) => {
    return async () => {
        console.log(uid1, uid2);
    }
}

export const {  } = messagesSlice.actions;
export default messagesSlice.reducer;