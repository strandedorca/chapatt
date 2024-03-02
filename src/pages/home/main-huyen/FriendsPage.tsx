import { Box, styled } from "@mui/system";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Title from "../../../components/Title";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import AddCommentRoundedIcon from "@mui/icons-material/AddCommentRounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFriendRequest,
  refuseFriendRequest,
  selectAllFriends,
  selectBlocked,
  selectCurrentList,
  selectPending,
  subscribeToFriendList,
  unblockFriend,
} from "../../../redux-slices/friendsSlice.tsx";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { selectCurrentUser } from "../../../redux-slices/currentUserSlice.tsx";
import { useNavigate } from "react-router-dom";
import AutoModeRoundedIcon from "@mui/icons-material/AutoModeRounded";
import BlockModal from "../../../components/BlockModal.tsx";

const SearchBar = styled("input")(({ theme }) => ({
  width: "100%",
  border: "none",
  borderRadius: "5px",
  height: "36px",
  padding: "10px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));
const boxStyle = {
  display: "flex",
  flexDirection: "column",
};
const UserBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 0",
  borderTop: "1px white solid",
});

const FriendsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentList = useSelector(selectCurrentList);
  const currentUser = useSelector(selectCurrentUser);
  const allFriends = useSelector(selectAllFriends);
  const pendingFriends = useSelector(selectPending);
  const blockedFriends = useSelector(selectBlocked);
  const [blockModalOpen, setBlockModalOpen] = useState(false);

  // Update friend list
  useEffect(() => {
    const unsubscriber = dispatch(
      subscribeToFriendList(currentUser.username) as any
    );
    return () => unsubscriber;
  }, [currentUser, currentList]);

  let list, title;
  if (currentList === "friends") {
    title = "all";
    list = allFriends;
  } else if (currentList === "pending") {
    title = "pending";
    list = pendingFriends;
  } else {
    title = "blocked";
    list = blockedFriends;
  }

  let mainContent = list.map((friendUsername: any) => {
    return (
      <UserBox key={friendUsername}>
        <Box display="flex" gap="10px" alignItems="center">
          <Avatar />
          <Typography padding="0">{friendUsername}</Typography>
        </Box>
        <Box display="flex">
          {currentList === "pending" ? (
            <>
              <IconButton
                onClick={() => {
                  const payload = {
                    username: currentUser.username,
                    senderUsername: friendUsername,
                  };
                  dispatch(acceptFriendRequest(payload) as any);
                }}
              >
                <CheckCircleRoundedIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  const payload = {
                    username: currentUser.username,
                    senderUsername: friendUsername,
                  };
                  dispatch(refuseFriendRequest(payload) as any);
                }}
              >
                <CancelRoundedIcon />
              </IconButton>
            </>
          ) : currentList === "friends" ? (
            <>
              <IconButton
                onClick={() => {
                  navigate(`/me/${friendUsername}`);
                }}
              >
                <AddCommentRoundedIcon />
              </IconButton>
              <IconButton>
                <PersonRemoveAlt1RoundedIcon />
              </IconButton>
            </>
          ) : (
            <IconButton>
              <AutoModeRoundedIcon
                onClick={() => {
                  const payload = {
                    blockedUsername: friendUsername,
                    username: currentUser.username,
                  };
                  dispatch(unblockFriend(payload) as any);
                }}
              />
            </IconButton>
          )}
        </Box>
      </UserBox>
    );
  });

  const handleBlockModalClose = () => {
    setBlockModalOpen(false);
  };
  const handleBlockModalOpen = () => {
    setBlockModalOpen(true);
  };

  return (
    <Box height="100%" padding="20px 30px" position="relative">
      {/* Searchbar */}
      {currentList === "friends" && (
        <Box>
          <SearchBar type="text" placeholder="Search" />
          <SearchRoundedIcon
            sx={{
              position: "absolute",
              top: "26px",
              right: "40px",
            }}
          />
        </Box>
      )}

      {/* Block Button */}
      {currentList === "blocked" && (
        <BlockModal
          modalOpen={blockModalOpen}
          handleClose={handleBlockModalClose}
        />
      )}

      {/* Title */}
      <Box
        paddingY="20px"
        display="flex"
        alignItems="center"
        gap="20px"
        justifyContent="space-between"
      >
        <Title content={title} />
        {currentList === "blocked" && (
          <Button
            variant="contained"
            sx={{ width: "10rem" }}
            onClick={handleBlockModalOpen}
          >
            Block a user
          </Button>
        )}
      </Box>

      {/* Main */}
      <Box sx={boxStyle}>{mainContent}</Box>
    </Box>
  );
};

export default FriendsPage;
