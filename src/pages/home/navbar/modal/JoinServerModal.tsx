import React, { useState } from 'react';
import { Modal, Typography, Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { doc, getDoc } from 'firebase/firestore';
import Toast from '../../../../components/Toast';
import { db } from '../../../../firebase/firebase';
import { AppDispatch } from '../../../../main';
import { selectCurrentUser } from '../../../../redux-slices/currentUserSlice';
import { joinAServer } from '../../../../redux-slices/serverSlice';
import { darkTheme } from '../../../../theme';

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

interface JoinServerModalProp {
    modalOpen: boolean,
    handleClose: () => void,
    notify: (arg: string) => void,
}

const JoinServerModal = ({ notify, modalOpen, handleClose }: JoinServerModalProp) => {
    const [serverName, setServerName] = useState('');
    const dispatch: AppDispatch = useDispatch();
    const [isValidEmail, setIsValidEmail] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const [showError, setShowError] = useState(false);

    const serverNameExists = async (serverName: string) => {
        try {
            const serverDoc = await getDoc(doc(db, 'servers', serverName));
            return serverDoc.exists;
            // Returns true if the document exists, false otherwise
        } catch (error) {
            console.error('Error checking server existence:', error);
            return false;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        serverNameExists(serverName)
            .then((exists) => {
                if (exists)
                    dispatch(joinAServer({
                        serverName,
                        username: currentUser.username,
                    }));
                setServerName('');
                setShowError(false);
                notify('JOIN_SUCCESS');
                handleClose();
            })
            .catch((err) => {
                setShowError(true);
                notify('JOIN_FAILED');
                console.log(err);
            })
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServerName(e.target.value.toLowerCase());
        setIsValidEmail(!!e.target.value); // Set isValidEmail to true if email is not empty
    };
    return (
        <div>
            <Toast />
            <Modal open={modalOpen} onClose={() => {
                setServerName('');
                setShowError(false);
                handleClose();
            }}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2" sx={{ marginBottom: '10px' }}>
                        Join A Server
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ marginBottom: '20px', fontStyle: 'italic' }}>
                        Join a server by typing in its server name:
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <TextField
                            type="text"
                            id="username"
                            name="username"
                            placeholder='Enter a server name'
                            value={serverName}
                            onChange={handleUsernameChange}
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: '20px' }}
                        />
                        <Typography sx={{ marginBottom: '20px', fontStyle: 'italic', color: darkTheme.palette.error.main }} display={showError ? 'block' : 'none'}>
                            Server name does not exist!
                        </Typography>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!isValidEmail}
                        >
                            Join!
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default JoinServerModal;
