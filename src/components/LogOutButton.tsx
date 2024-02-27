import { PowerSettingsNew } from '@mui/icons-material';
import { Button, styled } from '@mui/material';

const LogOutButtonStyled = styled(Button)(({ theme }) => ({
    color: theme.palette.error.main,
    backgroundColor: 'transparent',
    borderRadius: 4,
    padding: 8,
    margin: 4,
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.error.main,
        color: '#fff',
    },
}));

type LogOutButtonProps = {
    handleLogOut: () => void;
    top?: string;
    bottom?: string;
    right?: string;
    left?: string;
};

const LogOutButton: React.FC<LogOutButtonProps> = ({ handleLogOut, top, bottom, right, left }) => {
    const buttonStyle: React.CSSProperties = {
        position: 'absolute',
        top,
        bottom,
        right,
        left,
    };

    return (
        <LogOutButtonStyled onClick={handleLogOut} style={buttonStyle}>
            <PowerSettingsNew />
        </LogOutButtonStyled>
    );
};

export default LogOutButton;