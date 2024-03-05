import { styled, useTheme } from "@mui/system";

interface ServerButtonProp {
    photoURL?: string | null,
    children?: React.ReactElement,
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ServerButton = ({ photoURL, children, onClick }: ServerButtonProp) => {
    const theme = useTheme();
    const Button = styled('button')(({ theme }) => ({
        cursor: "pointer",
        fontFamily: 'Inter',
        height: "48px",
        width: "48px",
        border: "none",
        color: theme.palette.text.primary,
        borderRadius: "24px",
        backgroundColor: theme.palette.background.paper,
        backgroundImage: `url(${photoURL})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        "&:hover": {
            borderRadius: "16px",
            backgroundColor: theme.palette.primary.main,
            color: 'black'
        },
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }))
    return (
        <div>
            <Button onClick={onClick}>
                {!photoURL ? children : null}
            </Button>
        </div>
    )
}

export default ServerButton