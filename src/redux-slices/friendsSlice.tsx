import { createSlice } from "@reduxjs/toolkit/react";
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AppThunk } from "../types";
import { Unsubscribe } from "firebase/auth";

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
        try {
            // Add to friendsCollectionRef
            await setDoc(doc(db, 'friends', username), {
                friends: [],
                pending: [],
                blocked: [],
            });
        } catch (error) {
            console.log('Error initializing friends list.', error);
        }
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
                const unsubscriber: Unsubscribe = onSnapshot(documentRef, (doc) => {
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
        try {
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
        } catch (error) {
            console.log('Error accepting friend', error);
        }
    }
}

export const deleteFriend = ({ username, friendUsername }: { username: string; friendUsername: string; }): AppThunk<void> => {
    return async () => {
        try {
            if (username) {
                const friendsCollectionRef = collection(db, 'friends');
                // Delete from current user's friend list
                await updateDoc(doc(friendsCollectionRef, username), {
                    friends: arrayRemove(friendUsername),
                });
                // Delete from friend's friend list
                await updateDoc(doc(friendsCollectionRef, friendUsername), {
                    friends: arrayRemove(username),
                });
            }
        } catch (error) {
            console.log('Error deleting friend', error);
        }
    }
}

export const refuseFriendRequest = ({ username, senderUsername }: any) => {
    return async () => {
        try {
            if (username) {
                const friendsCollectionRef = collection(db, 'friends');
                // Delete from pending list
                await updateDoc(doc(friendsCollectionRef, username), {
                    pending: arrayRemove(senderUsername),
                });
            }
        } catch (error) {
            console.log('Error refusing friend request', error);
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
            console.log('Error blocking user. Please try again.', error);
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
            console.log('Error unblocking user. Please try again.', error);
        }
    }
}

export const getFriendInfo = (username: string) => {
    return async () => {
        try {
            const userQuery = query(collection(db, 'users'), where('username', '==', username));
            const userQuerySnapshot = await getDocs(userQuery);
            if (!userQuerySnapshot.empty) {
                const userData = userQuerySnapshot.docs[0].data();
                const { username, displayName, photoURL, status } = userData;
                return { username, displayName, photoURL, status };
            } else {
                console.log("User with username", username, "not found.");
            }
        } catch (error) {
            console.log("Error retrieving userdata from server", error);
        }
    }
}

export const selectAllFriends = (state: any) => (state.friends.friends);
export const selectPending = (state: any) => (state.friends.pending);
export const selectBlocked = (state: any) => (state.friends.blocked);
export const selectCurrentList = (state: any) => (state.friends.currentList);

export const { setFriendList, setCurrentList } = friendsSlice.actions;
export default friendsSlice.reducer