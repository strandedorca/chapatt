import { createSlice } from "@reduxjs/toolkit/react";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const initialState: any = [];

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        addFriend(state, action) {
            state.push(action.payload);
        }
    }
})

export const getUser = (user: User) => {
    return async (dispatch: any) => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            addFriend(userSnap.data());
        } else {
            console.log("User doesn't exist");
        }
    }
}

export const { addFriend } = friendsSlice.actions;
export default friendsSlice.reducer