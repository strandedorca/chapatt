import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserPayload, getUserDocument, selectCurrentUser, updateUserDocument } from "../redux-slices/currentUserSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { addAnEmptyFriendsDoc } from "../redux-slices/friendsSlice";
import { isValidUsername, usernameExistsPromise } from "./helper-functions";
import { AppDispatch } from "../main";

interface FormDialogProp {

}

const FormDialog = ({ }: FormDialogProp) => {
  const [username, setUsername] = useState('');
  const [showUsernameWarning, setShowUsernameWarning] = useState(false);
  const [showExistingUsernameWarning, setshowExistingUsernameWarning] = useState(false);
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user) {
      dispatch(getUserDocument(user));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (currentUser.username === null) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentUser.username]);

  // Handlers
  const handleClose = () => {
    setOpen(false);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowUsernameWarning(false);
    setshowExistingUsernameWarning(false);
    if (isValidUsername(username)) {
      usernameExistsPromise(username)
        // If available to set
        .then(() => {
          // Set username for the current user
          dispatch(updateUserDocument({ user, username } as UpdateUserPayload));
          dispatch(addAnEmptyFriendsDoc(username));
          handleClose();
        })
        //  If unavailable to set
        .catch((error) => {
          setshowExistingUsernameWarning(true);
          console.log(error);
        })
    } else {
      setShowUsernameWarning(true);
    }
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
      <DialogContent sx={{ width: '400px' }}>
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
        <DialogContentText color={theme.palette.error.main} display={showExistingUsernameWarning ? 'block' : 'none'}>
          Username already exists.
        </DialogContentText>
        <DialogContentText color={theme.palette.error.main} display={showUsernameWarning ? 'block' : 'none'} style={{
          wordBreak: 'break-all',
          whiteSpace: 'normal',
        }}>
          Username must not contain any special character except for underscore.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit">Set username</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog