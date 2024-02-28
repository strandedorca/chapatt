import React, { useState } from 'react';
import { Modal, Typography, Box, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { sendFriendRequest } from '../../../redux-slices/friendsSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebase';
import { darkTheme } from '../../../theme';

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
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      senderEmail: user?.email,
      email,
    };
    dispatch(sendFriendRequest(payload) as any);
    handleClose();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValidEmail(!!e.target.value); // Set isValidEmail to true if email is not empty
  };
  return (
    <Modal open={modalOpen} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: '10px' }}>
          Add Friend
        </Typography>
        <Typography id="modal-modal-description" sx={{ marginBottom: '20px', fontStyle: 'italic' }}>
          Add a friend by typing in their email address:
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <TextField
            type="email"
            id="email"
            name="email"
            placeholder='Enter Your Email'
            value={email}
            onChange={handleEmailChange}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '20px' }}
          />
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
