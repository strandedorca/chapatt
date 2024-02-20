import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { Avatar, Box } from '@mui/material';
import {
    AccountCircle,
    Help,
    Inbox,
    PersonAdd,
    PushPin,
    Videocam,
    WifiCalling3,
} from '@mui/icons-material';

// Styled components for search
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1.5, 1, 1, 0),
        transition: 'all 0.3s',
        width: '50px',
        '&:focus': {
            width: '200px',
        },
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const CircleIcon = styled('div')(() => ({
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '7px',
        right: '-2px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        width: '1em',
        height: '1em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
    },
}));

// Define your custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#313338', // Set primary color to #313338
        },
    },
});

export default function Header() {
    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="Hieu Bui" src="#" />
                        <Typography variant="h6" noWrap component="div" sx={{ px: 1 }}>
                            Hieu Bui
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex' }}>
                        <IconButton color="inherit">
                            <WifiCalling3 />
                        </IconButton>
                        <IconButton color="inherit">
                            <Videocam />
                        </IconButton>
                        <IconButton color="inherit">
                            <PersonAdd />
                        </IconButton>
                        <IconButton color="inherit">
                            <PushPin />
                        </IconButton>
                        <IconButton color="inherit">
                            <CircleIcon>
                                <AccountCircle />
                            </CircleIcon>
                        </IconButton>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>

                        <IconButton color="inherit">
                            <Inbox />
                        </IconButton>
                        <IconButton color="inherit">
                            <Help />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
