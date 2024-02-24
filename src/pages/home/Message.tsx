import { Avatar } from "@mui/material"
import { Box } from "@mui/system"

const Message = ({ name, content, timestamp }: any) => {
    return (
        <Box display="flex" gap="10px" marginBottom="15px" alignItems="flex-start">
            <Avatar />
            <div>
                <Box display="flex" gap="10px" alignItems="center" sx={{ marginBottom: "-10px" }}>
                    <p style={{ fontWeight: "bold"}}>{name}</p>
                    <p style={{ fontSize: ".8em" }}>{timestamp}</p>
                </Box>
                <p>{content}</p>
            </div>
        </Box>
    )
}

export default Message