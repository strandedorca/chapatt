import { createSlice, current } from "@reduxjs/toolkit/react";
import { arrayRemove, arrayUnion, collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { setConversation } from "./messagesSlice";
import { usernameExistsPromise } from "../components/helper-functions";

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
        const docRef = doc(db, 'friends', username);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();

                // Check if sender is blocked or already friends
                if (
                    data.friends.includes(senderUsername) ||
                    data.blocked.includes(senderUsername)
                ) {
                    console.log(`${senderUsername} is already friends or blocked.`);
                    return;
                }

                // Check if target is blocked - if yes remove from blocked
                const currentUserRef = doc(db, 'friends', senderUsername);
                await updateDoc(currentUserRef, {
                    blocked: arrayRemove(username)
                });

                // Add sender to pending friends
                await updateDoc(docRef, {
                    pending: arrayUnion(senderUsername)
                });
                console.log(`Friend request sent from ${senderUsername} to ${username}.`);
            } else {
                console.log(`User ${username} does not exist in the friends collection.`);
            }
        } catch (error) {
            console.error('Failed to send friend request.', error);
        }
    };
};

export const subscribeToFriendList = (username: string) => {
    return async (dispatch: any) => {
        if (username) {
            // Get ref to friendlist of current user
            const documentRef = doc(db, 'friends', username);
            // Subscribe to the user friends document
            try {
                const unsubscriber = onSnapshot(documentRef, (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        dispatch(setFriendList(data));
                    } else {
                        console.log("Friends document doesn't exist");
                    }
                });
                // To unsubscribe later
                return unsubscriber;
            } catch (error) {
                console.log('Failed to subscribe to document.', error);
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

export const refuseFriendRequest = ({ username, senderUsername }: any) => {
    return async () => {
        if (username) {
            const friendsCollectionRef = collection(db, 'friends');
            // Delete from pending list
            await updateDoc(doc(friendsCollectionRef, username), {
                pending: arrayRemove(senderUsername),
            });
        }
    }
}

export const blockFriend = ({ username, blockedUsername }: any) => {
    return async () => {
        const currentUserRef = doc(db, 'friends', username);
        const blockedUserRef = doc(db, 'friends', blockedUsername);
        try {
            // Add to the block list
            await updateDoc(currentUserRef, {
                blocked: arrayUnion(blockedUsername)
            })
            // Remove if already friends
            await updateDoc(currentUserRef, {
                friends: arrayRemove(blockedUsername)
            });
            await updateDoc(blockedUserRef, {
                friends: arrayRemove(username)
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export const unblockFriend = ({ username, blockedUsername }: any) => {
    return async () => {
        const currentUserRef = doc(db, 'friends', username);
        try {
            await updateDoc(currentUserRef, {
                blocked: arrayRemove(blockedUsername)
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const selectAllFriends = (state: any) => (state.friends.friends);
export const selectPending = (state: any) => (state.friends.pending);
export const selectBlocked = (state: any) => (state.friends.blocked);
export const selectCurrentList = (state: any) => (state.friends.currentList);

export const { setFriendList, setCurrentList } = friendsSlice.actions;
export default friendsSlice.reducer