import { Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Button } from "./ServerSidebar";

interface ConversationsNavigationItemProp {
  username: string,
  displayName: string,
  photoUrl: string,
}

const ConversationsNavigationItem = ({ username, displayName, photoUrl }: ConversationsNavigationItemProp) => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => { navigate(`/me/${username}`) }}>
      <Avatar
        src={photoUrl ? photoUrl : ''}
        sx={{ width: 32, height: 32 }}
      >
        {!photoUrl ? displayName[0].toUpperCase() : null}
      </Avatar>
      <div>{displayName}</div>
    </Button>
  )
}

export default ConversationsNavigationItem