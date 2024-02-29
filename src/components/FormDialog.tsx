import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserDocument, getUserDocument, selectCurrentUser, updateUserDocument } from "../redux-slices/currentUserSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { setUserId } from "firebase/analytics";
import { addAnEmptyFriendsDoc } from "../redux-slices/friendsSlice";

interface FormDialogProp {

}

const FormDialog = ({ }: FormDialogProp) => {
  const [username, setUsername] = useState('');
  const [showUsernameWarning, setShowUsernameWarning] = useState(false);
  const theme = useTheme();
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user) {
      dispatch(getUserDocument(user) as any);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (currentUser.username === null) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentUser.username]);

  const handleClose = () => {
    setOpen(false);
  }

  const usernameExists = async (username: string) => {
    const usersCollectionRef = collection(db, 'users');
    const usernameQuery = query(usersCollectionRef, where('username', '==', username));
    const usernameQuerySnapshot = await getDocs(usernameQuery);
    if (!usernameQuerySnapshot.empty) {
      // Username already exists
      return Promise.reject('Username already exists');
    }
    return Promise.resolve();
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    usernameExists(username)
      .then(() => {
        // Set username for the current user
        dispatch(updateUserDocument({ user, username }) as any);
        dispatch(addAnEmptyFriendsDoc(username) as any);
        handleClose();
      })
      .catch((error) => {
        setShowUsernameWarning(true);
        console.log(error);
      })
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Set username</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let's find you a unique name to start with!
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="username"
          name="username"
          label="Username"
          type="username"
          fullWidth
          variant="standard"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <DialogContentText color={theme.palette.error.main} display={showUsernameWarning ? 'block' : 'none'}>
          Username already exists!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit">Set username</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog