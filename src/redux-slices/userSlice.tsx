import { createAsyncThunk, createSlice } from "@reduxjs/toolkit/react";
// import { User } from "../types";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { User, deleteUser } from "firebase/auth";

const initialState = auth;

const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        updateUserDocument(state, action) {

        }
    }
})

export const addUserDocument = (user: User) => {
    return async () => {
        const { uid, email, displayName } = user;
        await setDoc(doc(db, 'users', uid), {
            uid,
            email, 
            displayName, 
        });
    }
}

export const deleteUserDocument = (uid: string) => {
    return async () => {
        if (uid) {
            await deleteDoc(doc(db, 'users', uid));
            const user: User | null = auth.currentUser;
            if (user) {
                deleteUser(user).then(() => {
                    console.log('Account deleted successfully');
                }).catch((error: Error) => {
                    console.log(error);
                });
            }
        }
    }
}

// What do I fetch user data for?
// export const fetchUserData = async () => {
//     const userRef = doc(db, 'user', ); 
// }

export const {  } = userSlice.actions;
export default userSlice.reducer