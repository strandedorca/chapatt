import { Box, styled, useTheme } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";
import Title from "../../../components/Title";
import Avatar from "@mui/material/Avatar";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux-slices/currentUserSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { deleteServer, leaveServer, selectCurrentServer, selectMembersFromServer } from "../../../redux-slices/serverSlice";
import AddMemberModal from "./AddMemberModal";
import Toast from "../../../components/Toast";
import { toast } from "react-toastify";
import LeaveServerConfirmation from "./LeaveServerConfirmation";
import { AppDispatch } from "../../../main";
import DeleteServerModal from "./DeleteServerModal";

// Styled components
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "8px",
  marginBottom: "15px",
  backgroundColor: theme.palette.background.paper,
}));
const Content = styled("p")({
  margin: "0",
  fontSize: ".8em",
});
const WhiteDivider = styled(Divider)({
  borderColor: "white",
  margin: "15px 0",
});
const MemberBox = styled(Box)(({ theme }) => ({
  width: "100%",
  transition: "all 0.5s ease",
  display: 'flex',
  alignItems: 'center',
  height: '36px',
  paddingLeft: '8px',
  margin: '0',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    color: theme.palette.common.black,
    marginBottom: "15px",
    backgroundColor: theme.palette.primary.main,
    margin: '0',
    cursor: 'pointer',
    marginLeft: '5px',
    marginTop: '-5px'
  }
}));

const RightSidebar = () => {
  const theme = useTheme();
  // Show different UI for me/server page
  const [isServer, setIsServer] = useState(false);
  const location = useLocation();
  const { username } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const currentServer = useSelector(selectCurrentServer)
  const [userToShow, setUserToShow] = useState(currentUser);
  const [showMembers, setShowMembers] = useState(false);
  const members = useSelector(selectMembersFromServer);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showLeaveServerModal, setShowLeaveServerModal] = useState(false);
  const [showDeleteServerModal, setShowDeleteServerModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (input: string) => {
    if (input === 'ADD_SUCCESS') {
      toast.success('Add member successfully!')
    } else if (input === 'ADD_FAILED') {
      toast.error('Failed to add member. Please try again.')
    } else if (input === 'LEAVE_SUCCESS') {
      toast.success('Leave server successfully.')
    } else if (input === 'LEAVE_FAILED') {
      toast.error('Failed to leaver server. Please try again.')
    } else if (input === 'DELETE_FAILED') {
      toast.success('Delete server successfully.')
    } else if (input === 'DELETE_FAILED') {
      toast.error('Failed to delete server. Please try again.')
    }
  }

  useEffect(() => {
    if (location.pathname.startsWith("/me")) {
      setIsServer(false);
    } else {
      setIsServer(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const getUserInfo = async (username: string) => {
      if (username) {
        const userQuery = query(
          collection(db, "users"),
          where("username", "==", username)
        );
        const userSnap = await getDocs(userQuery);
        if (!userSnap.empty) {
          setUserToShow(userSnap.docs[0].data());
        } else {
          console.log(
            "Username doesn't exist. This might be the first time signing in."
          );
        }
      }
    };
    getUserInfo(username ? username : currentUser.username);
  }, [currentUser, location]);

  // Handlers
  const handleCloseMemberModal = () => {
    setShowAddMemberModal(false);
  }
  const handleConfirmLeaveServer = () => {
    dispatch(leaveServer({
      serverName: currentServer.serverName,
      username: currentUser.username,
    }))
      .then(() => {
        notify('LEAVE_SUCCESS');
        setShowLeaveServerModal(false);
        navigate('/me');
      })
      .catch(() => {
        notify('LEAVE_FAILED');
      })
  }
  const handleConfirmDeleteServer = () => {
    dispatch(deleteServer(currentServer.serverName))
      .then(() => {
        notify('DELETE_SUCCESS');
        setShowDeleteServerModal(false);
        navigate('/me');
      })
      .catch(() => {
        notify('DELETE_FAILED');
      })
  }

  return (
    <Box height="100%" position="relative">
      {/* Banner */}
      {/* Servers don't have bannerColor -> show current user's banner color */}
      <Box
        id="banner"
        sx={{
          backgroundColor: userToShow.bannerColor,
          height: 120,
        }}
      ></Box>

      {/* Avatar */}
      <Box
        sx={{
          position: "absolute",
          top: "100px",
          transform: "translate(15px, -30%)",
        }}
      >
        <Avatar
          src={isServer ? currentServer.photoURL : userToShow.photoURL}
          sx={{
            width: 94,
            height: 94,
            border: `8px ${theme.palette.background.default} solid`,
          }}
        >
          {userToShow.displayName}
        </Avatar>
      </Box>

      {!(showMembers && isServer) ? (
        // Show normal information
        <Box paddingTop="60px" paddingX="15px">
          {/* Information */}
          <Section paddingX="15px" paddingY="18px">
            {/* Name */}
            <Typography
              sx={{
                fontSize: "1.1em",
                fontWeight: "bold",
              }}
            >
              {isServer ? currentServer.serverName : userToShow.displayName}
            </Typography>
            <Content>
              {isServer ? (
                `@${currentServer.serverName}`
              ) : (
                `@${userToShow.username}`
              )}
            </Content>

            <WhiteDivider />

            {!isServer && (
              <>
                <Title content="Status" />
                <Content>{userToShow.status}</Content>
                <WhiteDivider />
                <Title content="About Me" />
                <Content>{userToShow.aboutMe}</Content>
                <WhiteDivider />
              </>
            )}

            <Title content="Since" />
            <Content>{userToShow.createdAt}</Content>
          </Section>

          {/* Buttons */}
          {isServer &&
            <>
              <Section component={Button}
                onClick={() => setShowMembers(true)}>
                Show Members
              </Section>
              <Section component={Button}
                onClick={() => setShowAddMemberModal(true)}>
                Add A Member
              </Section>
              <Section component={Button}
                onClick={() => setShowLeaveServerModal(true)}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.error.main,
                    color: theme.palette.text.primary,
                  }
                }}>
                Leave Server
              </Section>
              <Button fullWidth
                sx={{
                  borderRadius: "8px",
                  '&:hover': {
                    backgroundColor: theme.palette.error.main,
                    color: theme.palette.text.primary,
                  }
                }}
                onClick={() => setShowDeleteServerModal(true)}
              >
                Delete Server
              </Button>
            </>
          }
        </Box>
      ) : (
        // Show members
        <Box paddingTop="70px" paddingX="30px">
          <Section component={Button}
            onClick={() => setShowMembers(false)}>
            Hide Members
          </Section>
          <Section component={Button}
            onClick={() => setShowAddMemberModal(true)}>
            Add A Member
          </Section>
          {members.map((member) => (
            <MemberBox
              key={member}
            >
              {`@${member}`}
            </MemberBox>
          ))}
        </Box>
      )
      }
      {/* Modals */}
      <AddMemberModal notify={notify} serverName={currentServer.serverName} modalOpen={showAddMemberModal} handleClose={handleCloseMemberModal} />
      <LeaveServerConfirmation
        openState={showLeaveServerModal}
        handleClose={() => setShowLeaveServerModal(false)}
        handleConfirm={handleConfirmLeaveServer}
        handleCancel={() => setShowLeaveServerModal(false)}
      />
      <DeleteServerModal
        openState={showDeleteServerModal}
        handleClose={() => setShowDeleteServerModal(false)}
        handleConfirm={handleConfirmDeleteServer}
        handleCancel={() => setShowDeleteServerModal(false)}
      />
    </Box>
  );
};

export default RightSidebar;
