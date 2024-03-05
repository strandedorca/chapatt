import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "./ServerSidebar";

interface ConversationsNavigationItemProp {
  username: string;
  displayName: string | null | undefined;
  photoURL: string | null | undefined;
  status: string;
}

const ConversationsNavigationItem = ({
  username,
  displayName,
  photoURL,
  status,
}: ConversationsNavigationItemProp) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate(`/me/${username}`);
      }}
    >
      <Avatar src={photoURL ? photoURL : ""} sx={{ width: 32, height: 32 }}>
        {(!photoURL && displayName) ? displayName[0].toUpperCase() : null}
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
