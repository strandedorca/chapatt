import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
// import { User } from "../types";
import { doc, getDoc, setDoc, deleteDoc, updateDoc, serverTimestamp, collection } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { User, deleteUser, updateProfile } from "firebase/auth";
import { darkTheme } from "../theme";
import { useTheme } from "@emotion/react";

const initialState = {
    uid: '',
    email: '',
    username: '',
    displayName: '',
    photoURL: '',
    createdAt: '',
    bannerColor: '',
    bannerURL: '',
    aboutMe: '',
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        updateCurrentUser(state: any, action: any) {
            const { field, value } = action.payload;
            state[field] = value;
        },
        setCurrentUser(state, action) {
            state.uid = action.payload.uid;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.createdAt = action.payload.createdAt;
            state.bannerColor = action.payload.bannerColor;
            state.bannerURL = action.payload.bannerURL;
            state.aboutMe = action.payload.aboutMe;
        }
    }
})

export const getUserDocument = (user: User) => {
    return async (dispatch: any) => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            dispatch(setCurrentUser(userSnap.data()))
        } else {
            console.log("User doesn't exist. This might be the first time signing in.");
        }
    }
}

export const addUserDocument = (user: any) => {
    return async () => {
        const {
            uid,
            email,
            displayName,
            photoURL = '',
            username = null,
        } = user;

        let dateObject;
        if (user.metadata?.creationTime) {
            dateObject = new Date(user.metadata.creationTime);
        } else {
            dateObject = new Date();
        }
        let createdAt = dateObject.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
        // Add to userCollection
        await setDoc(doc(db, 'users', uid), {
            username: username,
            email,
            displayName,
            photoURL,
            createdAt,
            bannerColor: '#eec18d',
            bannerURL: '',
            aboutMe: 'Hello there.'
        })

    }
}

export const updateUserDocument = (payload: any) => {
    // Parameters: { user, field: value, }
    return async (dispatch: any) => {
        const user = payload.user;
        const userRef = doc(db, 'users', user.uid);
        const field = Object.keys(payload)[1];
        const value = payload[field];

        // Update on firestore database
        await updateDoc(userRef, {
            [field]: value
        })

        // Update on firebase authentication
        if (['email', 'displayName', 'photoURL'].includes(field)) {
            if (auth.currentUser) {
                updateProfile(auth.currentUser, {
                    [field]: value
                })
            }
        }
        dispatch(getUserDocument(user));
        console.log('User updated successfully');
    }
}

export const deleteUserDocument = (uid: string) => {
    return async () => {
        if (uid) {
            // Delete on firestore database
            await deleteDoc(doc(db, 'users', uid));
            // Delete on firebase authentication
            const user: User | null = auth.currentUser;
            if (user) {
                deleteUser(user).then(() => {
                    console.log('Account deleted successfully');
                }).catch((error: Error) => {
                    console.log('Failed to delete account', error);
                });
            }
        }
    }
}

export const { setCurrentUser, updateCurrentUser } = currentUserSlice.actions;
export const selectCurrentUser = (state: any): any => (state.currentUser);
export const selectCurrentUserEmail = (state: any): any => (state.currentUser.email);
export default currentUserSlice.reducer