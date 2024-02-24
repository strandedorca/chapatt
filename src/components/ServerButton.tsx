import { Button } from "@mui/material"

interface ServerButtonProp {
    imgUrl?: string | null,
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
                color: "#d3d3d3",
                backgroundColor: "#313338",
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
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
                {!imgUrl ? children : null}
            </Button>
        </div>
    )
}

export default ServerButton