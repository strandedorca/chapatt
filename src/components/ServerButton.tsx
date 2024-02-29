import { styled, useTheme } from "@mui/system";

interface ServerButtonProp {
    imgUrl?: string | null,
    children?: React.ReactElement,
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ServerButton = ({ imgUrl, children, onClick }: ServerButtonProp) => {
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
        backgroundImage: `url(${imgUrl})`,
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
                {!imgUrl ? children : null}
            </Button>
        </div>
    )
}

export default ServerButton