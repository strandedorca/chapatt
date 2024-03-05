import { createSlice } from "@reduxjs/toolkit/react";
import {
  DocumentSnapshot,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AppDispatch, RootState } from "../main";
import { ServerListItem } from "../types";

interface ServerSliceValue {
  serverName: string,
  photoURL: string,
  members: [],
  messages: [],
  serverList: ServerListItem[],
  createdAt: string,
}

const initialState: ServerSliceValue = {
  serverName: "",
  photoURL: "",
  members: [],
  messages: [],
  serverList: [],
  createdAt: "",
};

const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    setCurrentServer(state, action) {
      state.serverName = action.payload.id;
      state.members = action.payload.members;
      state.messages = action.payload.messages;
      state.photoURL = action.payload.photoURL;
      state.createdAt = action.payload.createdAt;
    },
    setServerList(state, action) {
      state.serverList = action.payload;
    }
  },
});

export const addNewServer = ({ serverName, username, photoURL }: { serverName: string; username: string; photoURL: string | undefined }) => {
  return async () => {
    try {
      if (serverName) {
        // Data preparation
        if (!photoURL) {
          photoURL = '';
        }
        let dateObject = new Date();
        let createdAt = dateObject.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        });
        const serverCollectionRef = collection(db, "servers");
        // Add a new server to collection `servers`
        await setDoc(doc(serverCollectionRef, serverName), {
          photoURL,
          members: [username],
          messages: [],
          createdAt,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const subscribeToServerList = (username: string) => {
  return async (dispatch: AppDispatch) => {
    if (username) {
      try {
        const unsubscriber = onSnapshot(query(collection(db, "servers"),
          where("members", "array-contains", username)
        ), (snap) => {
          let newList: ServerListItem[] = [];
          snap.forEach((doc: DocumentSnapshot) => {
            if (doc.exists()) {
              const serverInfo = {
                serverName: doc.id,
                photoURL: doc.data().photoURL,
              }
              newList = [
                ...newList,
                serverInfo
              ];
            } else {
              console.log(`Server ${doc.id} document doesn't exist`);
            }
          });
          dispatch(setServerList(newList));
        })

        // To unsubscribe later
        return unsubscriber;
      } catch (error) {
        console.log("Failed to subscribe to server list.", error);
      }
    }
  }
}

export const subscribeToServer = (serverName: string) => {
  return async (dispatch: AppDispatch) => {
    if (serverName) {
      // Get ref to server
      const documentRef = doc(db, "servers", serverName);
      // Subscribe to the server document
      try {
        const unsubscriber = await onSnapshot(documentRef, (doc) => {
          let data;
          if (doc.exists()) {
            data = {
              id: doc.id,
              ...doc.data(),
            };
          } else {
            console.log("Server document doesn't exist");
          }
          dispatch(setCurrentServer(data));
        });

        // To unsubscribe later
        return unsubscriber;
      } catch (error) {
        console.log("Failed to subscribe to document.", error);
      }
    }
  };
};

export const joinAServer = ({ serverName, username }: { serverName: string; username: string }) => {
  return async () => {
    try {
      const serverRef = doc(db, "servers", serverName);
      await updateDoc(serverRef, {
        members: arrayUnion(username),
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const leaveServer = ({ serverName, username }: { serverName: string; username: string }) => {
  return async () => {
    try {
      const serverRef = doc(db, "servers", serverName);
      await updateDoc(serverRef, {
        members: arrayRemove(username),
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addMemberToServer = ({ serverName, username }: { serverName: string; username: string }) => {
  return async () => {
    if (username) {
      try {
        // Get ref to server
        const serverRef = doc(db, "servers", serverName);
        await updateDoc(serverRef, {
          members: arrayUnion(username),
        });
      } catch (error) {
        console.log('Error adding member to server.', error);
      }
    }
  }
}

interface sendMessageToServerPayload {
  from: string,
  to: string | undefined,
  content: string
}
export const sendMessageToServer = (payload: sendMessageToServerPayload) => {
  // payload: from: username, content: string
  return async () => {
    try {
      const { from, to, content } = payload;
      if (to) {
        // Get ref to server
        const documentRef = doc(db, "servers", to);
        const message = {
          from,
          content,
          createdAt: new Date(),
        };
        // Add sender to pending friends
        await updateDoc(documentRef, {
          messages: arrayUnion(message),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteServer = (serverName: string) => {
  return async () => {
    if (serverName) {
      try {
        // Get ref to server
        const serverRef = doc(db, "servers", serverName);
        await deleteDoc(serverRef);
      } catch (error) {
        console.log('Error deleting server.', error);
      }
    }
  }
}

export const selectMembersFromServer = (state: RootState) => state.server.members;
export const selectMessagesFromServer = (state: RootState) => state.server.messages;
export const selectServerList = (state: RootState) => state.server.serverList;
export const selectCurrentServer = (state: RootState) => state.server;

export const { setCurrentServer, setServerList } = serverSlice.actions;
export default serverSlice.reducer;
