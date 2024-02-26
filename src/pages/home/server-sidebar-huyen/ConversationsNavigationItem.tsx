import { Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Button } from "./ServerSidebar";

interface ConversationsNavigationItemProp {
    uid: string,
    displayName: string,
    photoUrl: string,
}

const ConversationsNavigationItem = ({ uid, displayName, photoUrl }: ConversationsNavigationItemProp) => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => { navigate(`/conversations/${uid}`) }}>
        <Avatar 
            src={photoUrl ? photoUrl : ''}
            sx={{ width: 32, height: 32 }}
        >
            {!photoUrl ? displayName[0] : null}
        </Avatar>
        <div>{displayName}</div>
    </Button>
  )
}

export default ConversationsNavigationItem