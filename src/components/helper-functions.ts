import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const usernameExistsPromise = async (username: string) => {
    // Reject if the username already exists
    // Resolve if available
    try {
        const usersCollectionRef = collection(db, 'users');
        const usernameQuery = query(usersCollectionRef, where('username', '==', username));
        const usernameQuerySnapshot = await getDocs(usernameQuery);
        if (!usernameQuerySnapshot.empty) {
            // Username already exists
            return Promise.reject('Username already exists');
        }
        return Promise.resolve('Username available');
    } catch (error) {
        console.log(error);
    }
}

export const isValidUsername = (username: string): boolean => {
    if (/^[a-zA-Z0-9_]+$/.test(username)) {
        return true;
    }
    return false;
}