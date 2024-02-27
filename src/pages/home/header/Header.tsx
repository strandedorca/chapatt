import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Divider, Modal, Tooltip } from '@mui/material';
import {
    AccountCircle,
    EmojiPeople,
    Group,
    Help,
    Inbox,
    MapsUgc,
    Notifications,
    PersonAdd,
    PushPin,
    Topic,
    Videocam,
    WifiCalling3,
} from '@mui/icons-material';

import { darkTheme } from '../../../theme';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendFriendRequest } from '../../../redux-slices/friendsSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    marginLeft: 0,
    width: 'auto',
    height: 'auto',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    display: 'flex',
    alignItems: 'center',
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    right: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.15, 1),
        transition: 'all 0.3s',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.default,
        width: '50px',
        '&:focus': {
            width: '200px',
        },
        [theme.breakpoints.up('md')]: {
            width: '14ch',
        },
    },
}));
const CustomIconButton = styled(IconButton)(({ theme }) => ({
    color: 'inherit',
    '&:focus': {
        outline: 'none',
    },
    '&:hover': {
        color: theme.palette.common.white,
    },
}));
const CustomButton = styled(Button)(({ theme }) => ({
    color: theme.palette.common.white,
    textTransform: 'none',
    fontSize: '16px',
    '&:focus': {
        color: theme.palette.grey[400],
    },
}));
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Header() {
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const { pathname } = location;

    // State management for add friend feature
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [user] = useAuthState(auth);

    // Add Friend Modal
    const handleAddFriend = () => {
        setModalOpen(true);
    }
    const handleCloseAddFriend = () => {
        setModalOpen(false);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            senderEmail: user?.email,
            email,
        }
        dispatch(sendFriendRequest(payload) as any);
        handleCloseAddFriend();
    }

    const renderHeader = () => {
        // Render different headers based on pathname
        if (pathname === '/me') {
            return (
                
                <ThemeProvider theme={darkTheme}>
                    {/* Modal */}
                    {/* Cần chuyển sang file mới */}
                    <Modal 
                        open={modalOpen}
                        onClose={handleCloseAddFriend}
                    >
                        <Box sx={style}>
                            <Typography variant="h6" component="h2">
                                Add Friend
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Add a friend by typing in their email address:
                            </Typography>
                            <form action="" onSubmit={handleSubmit}>
                                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <button type="submit">Add friend</button>
                            </form>
                        </Box>
                    </Modal>
                    
                    {/* Main */}
                    <AppBar position='sticky'>
                        <Toolbar style={{ minHeight: '48px' }} sx={{ justifyContent: 'space-between' }} >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography><EmojiPeople /> Friends </Typography>
                                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                                <CustomButton>Online</CustomButton>
                                <CustomButton>All</CustomButton>
                                <CustomButton>Pending</CustomButton>
                                <CustomButton>Blocked</CustomButton>
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    sx={{
                                        backgroundColor: darkTheme.palette.success.main,
                                        mx: 2,
                                        '&:focus': {
                                            color: darkTheme.palette.success.main,
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                    onClick={handleAddFriend}
                                >
                                    Add Friend
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex' }} color={darkTheme.palette.text.secondary}>
                                <CustomIconButton>
                                    <Tooltip title="New Group DM" arrow>
                                        <MapsUgc />
                                    </Tooltip>
                                </CustomIconButton>
                                <Divider orientation="vertical" flexItem sx={{ m: 1 }} />
                                <CustomIconButton>
                                    <Tooltip title="Inbox" arrow>
                                        <Inbox />
                                    </Tooltip>
                                </CustomIconButton>
                                <CustomIconButton>
                                    <Tooltip title="Help" arrow>
                                        <Help />
                                    </Tooltip>
                                </CustomIconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            );
        } else if (pathname.startsWith('/me/')) {
            return (
                <ThemeProvider theme={darkTheme}>
                    <AppBar position='sticky'>
                        <Toolbar style={{ minHeight: '48px' }} sx={{ justifyContent: 'space-between' }} >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt="Hieu Bui" src="#"
                                    sx={{ width: 24, height: 24 }}
                                />
                                <Tooltip title="Hieu Bui" arrow>
                                    <Typography variant="h6" noWrap component="div" sx={{ px: 1.5, fontSize: "1rem", cursor: 'pointer' }}>
                                        Hieu Bui
                                    </Typography>
                                </Tooltip>
                            </Box>

                            <Box sx={{ display: 'flex' }} color={darkTheme.palette.text.secondary}>
                                <CustomIconButton>
                                    <Tooltip title="Start Voice Call" arrow>
                                        <WifiCalling3 />
                                    </Tooltip>
                                </CustomIconButton>
                                <CustomIconButton>
                                    <Tooltip title="Start Video Call" arrow>
                                        <Videocam />
                                    </Tooltip>
                                </CustomIconButton>
                                <CustomIconButton>
                                    <Tooltip title="Pined Messages" arrow>
                                        <PushPin />
                                    </Tooltip>
                                </CustomIconButton>
                                <CustomIconButton>
                                    <Tooltip title="Add Friends to DM" arrow>
                                        <PersonAdd />
                                    </Tooltip>
                                </CustomIconButton>
                                <CustomIconButton>
                                    <Tooltip title="Show/Hide User Profile" arrow>
                                        <AccountCircle />
                                    </Tooltip>
                                </CustomIconButton>

                                <Search>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                </Search>

                                <CustomIconButton>
                                    <Tooltip title="Inbox" arrow>
                                        <Inbox />
                                    </Tooltip>
                                </CustomIconButton>
                                <CustomIconButton>
                                    <Tooltip title="Help" arrow>
                                        <Help />
                                    </Tooltip>
                                </CustomIconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            );
        } else {
            return (
                <ThemeProvider theme={darkTheme}>
                    <AppBar position='sticky'>
                        <Toolbar style={{ minHeight: '48px' }} sx={{ justifyContent: 'space-between' }} >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h4' color={darkTheme.palette.grey[600]} component='div'>#</Typography>
                                <Typography variant="h6" noWrap component="div" sx={{ px: 1.5, fontSize: "1rem", cursor: 'pointer' }}>
                                    general
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex' }} color={darkTheme.palette.text.secondary}>
                                <CustomIconButton>
                                    <Tooltip title="Threads" arrow>
                                        <Topic />
                                    </Tooltip>
                                </CustomIconButton>
                                <CustomIconButton>
                                    <Tooltip title="Notification Settings" arrow>
                                        <Notifications />
                                    </Tooltip>
                                </CustomIconButton>
                                <CustomIconButton>
                                    <Tooltip title="Pined Messages" arrow>
                                        <PushPin />
                                    </Tooltip>
                                </CustomIconButton>
                                <CustomIconButton>
                                    <Tooltip title="Show Member List" arrow>
                                        <Group />
                                    </Tooltip>
                                </CustomIconButton>

                                <Search>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                </Search>

                                <CustomIconButton>
                                    <Tooltip title="Inbox" arrow>
                                        <Inbox />
                                    </Tooltip>
                                </CustomIconButton>
                                <CustomIconButton>
                                    <Tooltip title="Help" arrow>
                                        <Help />
                                    </Tooltip>
                                </CustomIconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            );
        }
    };

    return (
        renderHeader()
    );
}
