import React, { useState } from 'react';
import { Modal, Typography, Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sendFriendRequest } from '../../../redux-slices/friendsSlice';
import { db } from '../../../firebase/firebase';
import { darkTheme } from '../../../theme';
import { selectCurrentUser } from '../../../redux-slices/currentUserSlice';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AppDispatch } from '../../../main';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: darkTheme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const AddFriendModal = ({ modalOpen, handleClose }: { modalOpen: boolean, handleClose: () => void }) => {
  const [username, setUsername] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const [showError, setShowError] = useState(false);

  const usernameExists = async (username: string) => {
    const usersCollectionRef = collection(db, 'users');
    const usernameQuery = query(usersCollectionRef, where('username', '==', username));
    const usernameQuerySnapshot = await getDocs(usernameQuery);
    if (!usernameQuerySnapshot.empty) {
      // Username already exists
      return Promise.resolve();
    }
    return Promise.reject('Username does not exist');
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      senderUsername: currentUser.username,
      username,
    };
    usernameExists(username)
      .then(() => {
        dispatch(sendFriendRequest(payload));
        setUsername('');
        setShowError(false);
        handleClose();
      })
      .catch((err) => {
        setShowError(true);
        console.log(err);
      })
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.toLowerCase());
    setIsValidEmail(!!e.target.value); // Set isValidEmail to true if email is not empty
  };
  return (
    <Modal open={modalOpen} onClose={() => {
      setUsername('');
      setShowError(false);
      handleClose();
    }}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: '10px' }}>
          Add Friend
        </Typography>
        <Typography id="modal-modal-description" sx={{ marginBottom: '20px', fontStyle: 'italic' }}>
          Add a friend by typing in their username:
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <TextField
            type="text"
            id="username"
            name="username"
            placeholder='Enter a username'
            value={username}
            onChange={handleUsernameChange}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '20px' }}
          />
          <Typography sx={{ marginBottom: '20px', fontStyle: 'italic' }} color={darkTheme.palette.error.main} display={showError ? 'block' : 'none'}>
            User name does not exist!
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isValidEmail}
          >
            Add friend
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddFriendModal;
