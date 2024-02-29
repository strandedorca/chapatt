import { Dispatch, createSlice } from "@reduxjs/toolkit/react";
import { DocumentReference, DocumentSnapshot, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const initialState: any = {
    currentList: 'all',
    pending: [],
    friends: [],
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        setPendingList(state, action) {
            state.pending = action.payload;
        },
        setFriendList(state, action) {
            state.friends = action.payload;
        },
        setCurrentList(state, action) {
            state.currentList = action.payload;
        }
    }
})

export const getFriendList = (uid: string) => {
    return async (dispatch: Dispatch) => {
        const userRef: DocumentReference = doc(db, 'users', uid);
        const userSnap: DocumentSnapshot = await getDoc(userRef);

        if (userSnap.exists()) {
            const friendsCollectionRef = collection(userSnap.ref, 'friends');
            const friendsDocumentRef = doc(friendsCollectionRef, 'friends');
            const allFriendsCollectionRef = collection(friendsDocumentRef, 'friends');
            const querySnapshot = await getDocs(allFriendsCollectionRef);
            const friendList: any = [];
            querySnapshot.forEach((doc) => {
                friendList.push(doc.data());
            });
            dispatch(setFriendList(friendList));
        } else {
            console.log("User doesn't exist");
        }
    }
}

export const getPendingRequestList = (uid: string) => {
    return async (dispatch: any) => {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const friendsCollectionRef = collection(userSnap.ref, 'friends');
            const pendingDocumentRef = doc(friendsCollectionRef, 'pending');
            const pendingCollectionRef = collection(pendingDocumentRef, 'pending');
            const querySnapshot = await getDocs(pendingCollectionRef);
            const pendingRequests: any = [];
            querySnapshot.forEach((doc) => {
                pendingRequests.push(doc.data());
            });
            dispatch(setPendingList(pendingRequests));
        } else {
            console.log("User doesn't exist");
        }
    }
}

// Done
export const sendFriendRequest = ({ senderEmail, email }: any) => {
    return async () => {
        const userQuery = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const friendsCollectionRef = collection(userDoc.ref, 'friends');
            const pendingDocumentRef = doc(friendsCollectionRef, 'pending');
            const pendingCollectionRef = collection(pendingDocumentRef, 'pending');

            // Check if the request already exists
            // IS THIS NECESSARY?
            const existingRequestQuery = query(pendingCollectionRef, where('email', '==', email));
            const existingRequestSnapshot = await getDocs(existingRequestQuery);
            if (!existingRequestSnapshot.empty) {
                console.log('Request already exists');
                return;
            }

            // Add request
            await addDoc(pendingCollectionRef, { email: senderEmail });
            console.log('Request sent successfully!');
        } else {
            console.log('User not found');
        }
    }
}

export const acceptFriendRequest = ({ uid, email }: any) => {
    return async (dispatch: any) => {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const friendsCollectionRef = collection(userSnap.ref, 'friends');
            const pendingDocumentRef = doc(friendsCollectionRef, 'pending');
            const pendingCollectionRef = collection(pendingDocumentRef, 'pending');
            const querySnapshot = await getDocs(
                query(pendingCollectionRef, where('email', '==', email))
            );
            if (!querySnapshot.empty) {
                const pendingDocRef = querySnapshot.docs[0].ref;
                await deleteDoc(pendingDocRef);
                await addDoc(collection(db, 'users', uid, 'friends', 'friends', 'friends'), { email });
                getFriendList(uid);
                console.log('Friend request accepted successfully!');
            }
        } else {
            console.log("User doesn't exist");
        }
    }
}

export const selectAllFriends = (state: any) => (state.friends.friends);
export const selectPendingRequest = (state: any) => (state.friends.pending);
export const selectCurrentList = (state: any) => (state.friends.currentList);


export const { setPendingList, setFriendList, setCurrentList } = friendsSlice.actions;
export default friendsSlice.reducer