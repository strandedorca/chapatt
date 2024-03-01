import { styled } from "@mui/system"
import { Button } from "@mui/material"

interface IconButtonProp {
    children: React.ReactElement,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

const IconButton = ({ children, onClick }: IconButtonProp) => {
    const TransparentBtn = styled(Button)({
        backgroundColor: "transparent",
        border: "none",
        "&:hover": {
            backgroundColor: "transparent",
            border: "none",
        },
        "&:active": {
            backgroundColor: "transparent",
            border: "none",
        }
    })
    return (
        <TransparentBtn onClick={onClick}>
            {children}
        </TransparentBtn>
    )
}

export default IconButton