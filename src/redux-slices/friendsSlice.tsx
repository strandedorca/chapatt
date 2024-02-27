import { createSlice } from "@reduxjs/toolkit/react";
import { User } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { selectCurrentUserEmail } from "./currentUserSlice";

const initialState: any = {
    pending: [],
    // sent: [],
    friends: [],
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        setFriendList(state, action) {
            state.friends = action.payload;
        }
    }
})

// export const getUser = (user: User) => {
//     return async (dispatch: any) => {
//         const userRef = doc(db, 'users', user.uid);
//         const userSnap = await getDoc(userRef);
//         if (userSnap.exists()) {
//             return userSnap.data();
//         } else {
//             console.log("User doesn't exist");
//         }
//     }
// }

export const getFriendList = (uid: string) => {
    return async (dispatch: any) => {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            setFriendList(userSnap.data().friends.friends);
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
            setFriendList(userSnap.data().friends.pending);
        } else {
            console.log("User doesn't exist");
        }
    }
}

export const sendFriendRequest = ({ senderEmail, email }: any) => {
    return async () => {
        const userQuery = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const friendsCollectionRef = collection(userDoc.ref, 'friends');
            const pendingDocumentRef = doc(friendsCollectionRef, 'pending');
            const pendingCollectionRef = collection(pendingDocumentRef, 'pending');
            await addDoc(pendingCollectionRef, { senderEmail });

            console.log('Request sent successfully!');
        } else {
            console.log('User not found');
        }
    }
}

export const { setFriendList } = friendsSlice.actions;
export default friendsSlice.reducer