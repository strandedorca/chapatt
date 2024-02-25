import { Avatar } from "@mui/material"
import { Box } from "@mui/system"

const Message = ({ name, content, timestamp }: any) => {
    return (
        <Box 
            display="flex" 
            gap="10px" 
            marginBottom="25px" 
            alignItems="center"
        >
            <Avatar />
            <div>
                <Box display="flex" gap="10px" alignItems="center">
                    <p style={{ fontWeight: "bold"}}>{name}</p>
                    <p style={{ fontSize: ".8em" }}>{timestamp}</p>
                </Box>
                <p style={{ marginTop: "5px" }}>{content}</p>
            </div>
        </Box>
    )
}

export default Message