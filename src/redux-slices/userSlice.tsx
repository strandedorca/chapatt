import { createSlice } from "@reduxjs/toolkit/react";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const initialState: any = [];

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    }
})

export const getUser = (user: User) => {
    return async (dispatch: any) => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            
        } else {
            console.log("User doesn't exist");
        }
    }
}

export default userSlice.reducer