import * as React from 'react';
import { Box, List, ListItem, ListItemText, Divider, Typography, styled, Button, Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteUserDocument } from '../../redux-slices/currentUserSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { darkTheme } from '../../theme';

import { NavLink, useNavigate } from 'react-router-dom';
import MainSettings from './MainSettings';
import { useTheme } from '@emotion/react';
import Underconstruction from '../Underconstruction';


const Setting = () => {
    const [selectedTab, setSelectedTab] = React.useState('My Account');
    const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [user] = useAuthState(auth);

    const theme: any = useTheme();
    const navigate = useNavigate();
    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, newValue: React.SetStateAction<string>) => {
        setSelectedTab(newValue);
        // profile routing
        if (newValue === "Profiles") {
            navigate("/profiles")
        }
    };


    const settings = {
        'USER SETTINGS': ['My Account', 'Profile', 'Privacy & Safety', 'Family Centre', 'Authorised Apps', 'Devices', 'Connections', 'Clips', 'Friend Requests'],
        'APP SETTINGS': ['Appearance', 'Accessibility', 'Voice & Video', 'Chat', 'Notifications', 'Keybinds', 'Language', 'Streamer Mode', 'Advanced']
    };
    const CustomScrollbar = styled(Box)`
    width: 450px;
    height: 100vh;
    background-color: #2b2d31;
    color: #b5bac1;
    border-right: 1px solid #ccc;
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    padding-left: 14rem;
    padding-top: 4rem;

    &:hover {
        overflow: auto;
        scrollbar-width: thin;
        scrollbar-color: #000 #2b2d31;

        &::-webkit-scrollbar {
            width: 4px;
        }
    }

    scrollbar-width: none; /* For Firefox */
    &::-webkit-scrollbar {
        display: none; /* For Chrome, Safari, and Opera */
    }
    `;
    const BoxModal = styled(Box)(({ theme }) => ({
        position: 'absolute',
        top: `calc(50% - 50px)`,
        left: "50%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[24],
        opacity: 0.9,
        maxWidth: 400,
        padding: 24,
        transform: "translate(-50%, -50%)",
        "& .MuiDialogContent-root": {
            padding: theme.spacing(2),
        },
    }));

    const handleDeleteAccount = () => {
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirmed = () => {
        dispatch(deleteUserDocument(user?.uid ?? '') as any);
        setDeleteModalOpen(false);
    };

    const handleCancelled = () => {
        setDeleteModalOpen(false);
    };
    const handleLogOut = () => {
        auth.signOut();
    }

    return (
        <div>
            <CustomScrollbar>
                <List component="nav" sx={{ width: 200 }}>
                    {Object.entries(settings).map(([category, items]) => (
                        <React.Fragment key={category}>
                            <ListItem sx={{ padding: 2 }}>
                                <Typography variant="h6" sx={{ fontSize: 12, fontWeight: 'bold', color: '#949ba4' }}>
                                    {category}
                                </Typography>
                            </ListItem>
                            {items.map(text => (
                                <ListItem
                                    button
                                    key={text}
                                    selected={selectedTab === text}
                                    onClick={(event) => {
                                        handleListItemClick(event, text)
                                    }}
                                    sx={{
                                        padding: 0,
                                        paddingLeft: 2,
                                        bgcolor: selectedTab === text ? '#404249' : 'inherit',
                                        borderRadius: '4px',
                                        mb: '2px',
                                        '&:hover': {
                                            bgcolor: '#35373c',
                                        },
                                        '&.Mui-selected': {
                                            bgcolor: '#404249',
                                            color: '#ffffff',
                                            '&:hover': {
                                                bgcolor: '#35373c',
                                            },
                                        },
                                    }}
                                >
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                            <Divider sx={{ my: 1, bgcolor: '#3b3d44' }} />
                        </React.Fragment>
                    ))}
                    {/* Nút Delete Account */}
                    <ListItem button onClick={handleDeleteAccount} sx={{
                        padding: 0,
                        paddingLeft: 2,
                        borderRadius: '4px',
                        mb: '2px',
                        '&:hover': {
                            // bgcolor: '#35373c',
                            bgcolor: theme.palette.error.main
                        },
                        '&.Mui-selected': {
                            bgcolor: '#404249',
                            color: '#ffffff',
                            '&:hover': {
                                bgcolor: '#35373c',
                            },
                        },
                    }}>
                        <ListItemText primary="Delete Account" />
                    </ListItem>
                    {/* Nút Log Out */}
                    <ListItem button onClick={handleLogOut} sx={{
                        padding: 0,
                        paddingLeft: 2,
                        borderRadius: '4px',
                        mb: '2px',
                        '&:hover': {
                            bgcolor: '#35373c',
                        },
                        '&.Mui-selected': {
                            bgcolor: '#404249',
                            color: '#ffffff',
                            '&:hover': {
                                bgcolor: '#35373c',
                            },
                        },
                    }}>
                        <ListItemText primary="Log Out" />
                    </ListItem>
                    {/* Return to homepage */}
                    <ListItem button onClick={() => { navigate(-1) }} sx={{
                        padding: 0,
                        paddingLeft: 2,
                        borderRadius: '4px',
                        mb: '2px',
                        '&:hover': {
                            bgcolor: '#35373c',
                        },
                        '&.Mui-selected': {
                            bgcolor: '#404249',
                            color: '#ffffff',
                            '&:hover': {
                                bgcolor: '#35373c',
                            },
                        },
                    }}>
                        <ListItemText primary="Back to Homepage" />
                    </ListItem>
                </List>
            </CustomScrollbar>

            <Box sx={{ ml: '450px', p: 2 }}>
                {selectedTab === 'Profile' ? (
                    <MainSettings />
                ) : (
                    <Underconstruction />
                )}
            </Box>


            {/* Modal Confirm Delete Account */}
            <Modal
                open={isDeleteModalOpen}
                onClose={handleCancelled}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
            >
                <BoxModal>
                    <Typography id="delete-modal-title" variant="h6" component="h2" align="center" gutterBottom>
                        Confirm Account Deletion
                    </Typography>
                    <Typography id="delete-modal-description" variant="body1" component="p" align="center" gutterBottom>
                        Are you sure you want to delete your account? This action cannot be undone.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button variant="contained" color="error" onClick={handleDeleteConfirmed}>
                            Delete
                        </Button>
                        <Button variant="contained" onClick={handleCancelled} sx={{ ml: 2, bgcolor: darkTheme.palette.grey[500], color: darkTheme.palette.text.primary }}>
                            Cancel
                        </Button>
                    </Box>
                </BoxModal>
            </Modal>
        </div>
    );
};

export default Setting;
