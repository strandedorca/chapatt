import { createSlice } from "@reduxjs/toolkit/react";
// import { User } from "../types";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { User, deleteUser } from "firebase/auth";
import { darkTheme } from "../theme";

const initialState = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    createdAt: '',
    bannerColor: '',
    bannerURL: '',
    aboutMe: '',
};

const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        addFriend(state, action) {

        },
        updateUserDocument(state, action) {

        },
        setCurrentUser(state, action) { 
            state.uid = action.payload.uid;
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

export const addUserDocument = (user: User) => {
    return async () => {
        const { uid, email, displayName, photoURL } = user;
        let createdAt = '';
        if (user.metadata.creationTime) {
            const dateObject = new Date(user.metadata.creationTime);
            createdAt = dateObject.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            })
        }
        await setDoc(doc(db, 'users', uid), {
            uid,
            email, 
            displayName, 
            photoURL,
            createdAt,
            bannerColor: darkTheme.palette.primary.main,
            bannerURL: '',
            aboutMe: 'Tell me about you!',
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
export const getUserDocument = (user: User) => {
    return async (dispatch: any) => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // console.log(userSnap.data());
            dispatch(setCurrentUser(userSnap.data()))
        } else {
            console.log("User doesn't exist");
        }
    }
}

export const { setCurrentUser } = userSlice.actions;
export const selectCurrentUser = (state: any) : any => (state.currentUser);
export default userSlice.reducer