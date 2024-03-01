import React, { useState } from 'react';
import { Modal, Typography, Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { blockFriend, sendFriendRequest } from '../redux-slices/friendsSlice';
import { useTheme } from '@emotion/react';
import { selectCurrentUser } from '../redux-slices/currentUserSlice';
import { darkTheme } from '../theme';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

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

const BlockModal = ({ modalOpen, handleClose }: { modalOpen: boolean, handleClose: () => void }) => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const [isValid, setisValid] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const [showError, setShowError] = useState(false);
    const theme: any = useTheme();

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
            blockedUsername: username,
            username: currentUser.username,
        };
        usernameExists(username)
            .then(() => {
                dispatch(blockFriend(payload) as any);
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
        setisValid(!!e.target.value); // Set isValid to true if not empty
    };

    return (
        <Modal open={modalOpen} onClose={() => {
            setUsername('');
            setShowError(false);
            handleClose();
        }}>
            <Box sx={style}>
                <Typography variant="h6" component="h2" sx={{ marginBottom: '10px' }}>
                    Block
                </Typography>
                <Typography id="modal-modal-description" sx={{ marginBottom: '20px', fontStyle: 'italic' }}>
                    Block a user by typing in their username:
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
                    <Typography sx={{ marginBottom: '20px', fontStyle: 'italic', color: theme.palette.error.main }} display={showError ? 'block' : 'none'}>
                        Username does not exist!
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!isValid}
                    >
                        Block
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default BlockModal;
