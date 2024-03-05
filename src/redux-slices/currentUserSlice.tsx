import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
// import { User } from "../types";
import { doc, getDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { User, UserCredential, deleteUser, updateProfile } from "firebase/auth";
import { AppDispatch, RootState } from "../main";


export interface CurrentUserState {
    uid: string;
    username: string;
    email: string;
    displayName: string;
    photoURL: string;
    createdAt: string;
    status: string;
    bannerColor: string;
    bannerURL: string;
    aboutMe: string;
}

interface UpdateCurrentUserPayload {
    field: keyof CurrentUserState;
    value: string;
}

const initialState: CurrentUserState = {
    uid: '',
    email: '',
    username: '',
    displayName: '',
    photoURL: '',
    createdAt: '',
    status: 'Feeling cool 😎',
    bannerColor: '',
    bannerURL: '',
    aboutMe: '',
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        updateCurrentUser(state: CurrentUserState, action: PayloadAction<UpdateCurrentUserPayload>) {
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
            state.status = action.payload.status;
            state.bannerColor = action.payload.bannerColor;
            state.bannerURL = action.payload.bannerURL;
            state.aboutMe = action.payload.aboutMe;
        }
    }
})

export const getUserDocument = (user: User) => {
    return async (dispatch: AppDispatch) => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            dispatch(setCurrentUser(userSnap.data()))
        } else {
            console.log("User doesn't exist. This might be the first time signing in.");
        }
    }
}

export const addUserDocument = (user: User) => {
    return async () => {
        const {
            uid,
            email,
            displayName,
            photoURL = '',
        } = user;
        let username = null;
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
            status: 'Feeling cool 😎',
            bannerColor: '#eec18d',
            bannerURL: '',
            aboutMe: 'Hello there.'
        })

    }
}

export interface UpdateUserPayload {
    user: {
        uid: string;
    };
    [key: string]: string | { uid: string };
}

export const updateUserDocument = (payload: UpdateUserPayload) => {
    // Parameters: { user, field: value, }
    return async (dispatch: AppDispatch) => {
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
        dispatch(getUserDocument(user as User));
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


interface ExtendedUser extends User {
    updatePassword: (newPassword: string) => Promise<UserCredential>;
}

export const changePassword = ({ user, newPassword }: { user: ExtendedUser, newPassword: string }) => {
    user.updatePassword(newPassword).then(() => {
        console.log('Password updated successfully');
    }).catch((error: Error) => {
        console.log(error);
    })
}

export const { setCurrentUser, updateCurrentUser } = currentUserSlice.actions;
export const selectCurrentUser = (state: RootState) => (state.currentUser);
export const selectCurrentUserEmail = (state: RootState) => (state.currentUser.email);
export default currentUserSlice.reducer