import { Button } from "@mui/material"

interface ServerButtonProp {
    imgUrl?: string,
    children?: React.ReactElement,
}

const ServerButton = ({ imgUrl, children }: ServerButtonProp) => {
    return (
        <div>
            <Button sx={{
                height: "48px",
                minWidth: "0",
                width: "48px",
                borderRadius: "24px",
                backgroundColor: "#313338",
                backgroundImage: {imgUrl},
                "&:hover": {
                    borderRadius: "16px",
                    backgroundColor: "#5865f2",
                    backgroundImage: {imgUrl},
                },
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                {children}
            </Button>
        </div>
    )
}

export default ServerButton