import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "./ServerSidebar";

interface ConversationsNavigationItemProp {
  username: string;
  displayName: string;
  photoUrl: string;
  status: string;
}

const ConversationsNavigationItem = ({
  username,
  displayName,
  photoUrl,
  status,
}: ConversationsNavigationItemProp) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate(`/me/${username}`);
      }}
    >
      <Avatar src={photoUrl ? photoUrl : ""} sx={{ width: 32, height: 32 }}>
        {!photoUrl ? displayName[0].toUpperCase() : null}
      </Avatar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div>{displayName}</div>
        <div style={{ fontSize: ".9em" }}>{status}</div>
      </div>
    </Button>
  );
};

export default ConversationsNavigationItem;
