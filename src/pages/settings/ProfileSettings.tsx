import { Box, styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  updateUserDocument,
} from "../../redux-slices/currentUserSlice";
import { Avatar, Button, Divider, Typography } from "@mui/material";
import Title from "../../components/Title";
import { useState } from "react";
import { toast } from "react-toastify";
import Toast from "../../components/Toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useTheme } from "@emotion/react";

// Styled components
const Card = styled(Box)(({ theme }) => ({
  backgroundColor: `${theme.palette.background.default}`,
  paddingBottom: "20px",
  borderRadius: "10px",
  position: "relative",
}));
const Banner = styled(Box)({
  height: "120px",
  borderRadius: "8px 8px 0 0",
  WebkitBorderRadius: "8px 8px 0 0",
  MozBorderRadius: "8px 8px 0 0",
  width: "100%",
});
const Section = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  marginBottom: "15px",
  margin: "80px 20px 0",
  backgroundColor: theme.palette.background.paper,
}));
const FieldContainer = styled(Box)({
  margin: "15px 0",
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
});
const Content = styled("p")({
  margin: "5px 0 0 0",
});
const MyInput = styled("input")({
  width: "400px",
  fontFamily: "monospace",
  margin: "5px 0 0 0",
  backgroundColor: "transparent",
  border: "1px white solid",
  borderRadius: "5px",
  fontSize: "1em",
  padding: "8px",
});
const MyTextArea = styled("textarea")({
  width: "400px",
  margin: "5px 0 0 0",
  backgroundColor: "transparent",
  border: "1px white solid",
  borderRadius: "5px",
  fontSize: "1em",
  padding: "8px",
});
const WhiteDivider = styled(Divider)({
  borderColor: "white",
  margin: "15px 0",
});
const MyButton = styled(Button)({
  marginTop: "8px",
  fontSize: ".8rem",
  height: "2.5em",
});

interface ProfileSettingsProp {
  setSelectedTab: Function;
}

const ProfileSettings = ({ setSelectedTab }: ProfileSettingsProp) => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const theme: any = useTheme();
  const currentUser = useSelector(selectCurrentUser);
  const [editStatus, setEditStatus] = useState(false);
  const [editAboutMe, setEditAboutMe] = useState(false);
  const [status, setStatus] = useState(currentUser.status);
  const [aboutMe, setAboutMe] = useState(currentUser.aboutMe);

  // Manage Toast
  const notify = (input: string) => {
    if (input === "success") {
      toast.success("Updated successfully");
    } else if (input === "error") {
      toast.error("Failed to update. Please try again..");
    } else {
      toast.warning(
        "Requires recent login. Please log in again to change password."
      );
    }
  };

  // Handlers
  const handleStatusUpdate = async () => {
    if (editStatus && status !== currentUser.status) {
      try {
        dispatch(updateUserDocument({ user, status }) as any);
        notify("success");
      } catch (error) {
        notify("error");
        console.log(error);
      }
    }
    setEditStatus((prev) => !prev);
  };
  const handleAboutMeUpdate = async () => {
    if (editAboutMe && aboutMe !== currentUser.aboutMe) {
      try {
        dispatch(updateUserDocument({ user, aboutMe }) as any);
        notify("success");
      } catch (error) {
        notify("error");
        console.log(error);
      }
    }
    setEditAboutMe((prev) => !prev);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Toast />
      <Card>
        <Banner sx={{ backgroundColor: `${currentUser.bannerColor}` }}></Banner>

        {/* Avatar */}
        <Box
          sx={{
            position: "absolute",
            top: "100px",
            transform: "translate(40px, -40%)",
          }}
        >
          <Avatar
            src={currentUser.photoURL}
            sx={{
              width: 120,
              height: 120,
              border: `8px ${theme.palette.background.default} solid`,
            }}
          >
            {currentUser.displayName}
          </Avatar>
        </Box>
        <Section paddingX="15px" paddingY="18px">
          {/* Name */}
          <FieldContainer>
            <div>
              <Typography
                sx={{
                  fontSize: "1.1em",
                  fontWeight: "bold",
                }}
              >
                {currentUser.displayName}
              </Typography>
              <Content>{currentUser.username}</Content>
            </div>
            <MyButton
              variant="contained"
              onClick={() => setSelectedTab("Account")}
            >
              Edit account
            </MyButton>
          </FieldContainer>

          <WhiteDivider />

          {/* Status */}
          <FieldContainer>
            <div>
              <Title content="Status" />
              {editStatus ? (
                <MyInput
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ color: `${currentUser.bannerColor}` }}
                />
              ) : (
                <Content>{currentUser.status}</Content>
              )}
            </div>
            <MyButton variant="contained" onClick={handleStatusUpdate}>
              {editStatus ? "Save Status" : "Edit status"}
            </MyButton>
          </FieldContainer>

          <WhiteDivider />

          {/* About me */}
          <FieldContainer>
            <div>
              <Title content="About me" />
              {editAboutMe ? (
                <MyTextArea
                  id="aboutMe"
                  name="aboutMe"
                  value={aboutMe}
                  rows={4}
                  onChange={(e) => setAboutMe(e.target.value)}
                  style={{ color: `${currentUser.bannerColor}` }}
                />
              ) : (
                <Content>{currentUser.aboutMe}</Content>
              )}
            </div>
            <MyButton variant="contained" onClick={handleAboutMeUpdate}>
              {editAboutMe ? "Save Description" : "Edit description"}
            </MyButton>
          </FieldContainer>

          <WhiteDivider />

          {/* Since */}
          <Title content="Since" />
          <Content>{currentUser.createdAt}</Content>
        </Section>
      </Card>
    </Box>
  );
};

export default ProfileSettings;
