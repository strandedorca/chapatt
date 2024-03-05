import { PowerSettingsNew } from '@mui/icons-material';
import { Button, styled } from '@mui/material';

const LogOutButtonStyled = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 0,
    height: '60px',
    margin: '0px',
    width: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.error.main,
        borderRadius: 16,
        color: '#fff',
    },
}));

type LogOutButtonProps = {
    handleLogOut: () => void;
};

const LogOutButton: React.FC<LogOutButtonProps> = ({ handleLogOut }) => {
    return (
        <LogOutButtonStyled onClick={handleLogOut}>
            <PowerSettingsNew />
        </LogOutButtonStyled>
    );
};

export default LogOutButton;