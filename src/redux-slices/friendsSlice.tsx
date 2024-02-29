import { Dispatch, createSlice } from "@reduxjs/toolkit/react";
import { DocumentReference, DocumentSnapshot, addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const initialState: any = {
    currentList: 'friends',
    pending: [],
    friends: [],
    blocked: [],
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        setFriendList(state, action) {
            state.pending = action.payload.pending;
            state.friends = action.payload.friends;
            state.blocked = action.payload.blocked;
        },
        setCurrentList(state, action) {
            state.currentList = action.payload;
        }
    }
})

export const addAnEmptyFriendsDoc = (username: any) => {
    return async () => {
        // Add to friendsCollectionRef
        await setDoc(doc(db, 'friends', username), {
            friends: [],
            pending: [],
            blocked: [],
        });
    }
}

// Need to implement check for existing friends/blocked
export const sendFriendRequest = ({ senderUsername, username }: any) => {
    return async () => {
        const friendsCollectionRef = collection(db, 'friends');
        // Check if already friends/blocked

        // Add to pending friends
        await setDoc(doc(friendsCollectionRef, username), {
            pending: [
                senderUsername,
            ]
        }, {
            merge: true
        })
    }
}

export const getFriendsList = (username: string) => {
    return async (dispatch: any) => {
        // Get friends doc in friends collection
        const friendsCollectionRef = collection(db, 'friends');
        if (username) {
            const docRef = doc(friendsCollectionRef, username);
            if (docRef) {
                const docSnap = await getDoc(docRef);
                dispatch(setFriendList(docSnap.data()));
            }
        }
    }
}

export const acceptFriendRequest = ({ username, senderUsername }: any) => {
    return async () => {
        if (username) {
            const friendsCollectionRef = collection(db, 'friends');
            // Add to friendslist of currentUser
            await updateDoc(doc(friendsCollectionRef, username), {
                friends: arrayUnion(senderUsername),
            });
            // Add to friendsList of sender
            await updateDoc(doc(friendsCollectionRef, senderUsername), {
                friends: arrayUnion(username),
            });
            // Delete from pending list
            await updateDoc(doc(friendsCollectionRef, username), {
                pending: arrayRemove(senderUsername),
            });
        }
    }
}

export const selectAllFriends = (state: any) => (state.friends.friends);
export const selectPending = (state: any) => (state.friends.pending);
export const selectBlocked = (state: any) => (state.friends.blocked);
export const selectCurrentList = (state: any) => (state.friends.currentList);

export const { setFriendList, setCurrentList } = friendsSlice.actions;
export default friendsSlice.reducer