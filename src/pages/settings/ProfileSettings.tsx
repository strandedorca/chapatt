import { Box, styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateUserPayload,
  selectCurrentUser,
  updateUserDocument,
} from "../../redux-slices/currentUserSlice";
import { Avatar, Button, Divider, Typography } from "@mui/material";
import Title from "../../components/Title";
import { useState } from "react";
import { toast } from "react-toastify";
import Toast from "../../components/Toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AppDispatch } from "../../main";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { darkTheme } from "../../theme";

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
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [editStatus, setEditStatus] = useState(false);
  const [editAboutMe, setEditAboutMe] = useState(false);
  const [status, setStatus] = useState(currentUser.status);
  const [aboutMe, setAboutMe] = useState(currentUser.aboutMe);
  const [avatarIsHovered, setAvatarIsHovered] = useState(false);
  const [showSaveAvatar, setShowSaveAvatar] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  // const [avatar, setAvatar] = useState(null);
  // const [banner, setBanner] = useState(null);

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
  const handleUploadAvatar = async () => {
    try {
      if (uploadedPhoto !== null) {
        const imageRef = ref(storage, `/avatar/users/${currentUser.username}`);
        const snapshot = await uploadBytes(imageRef, uploadedPhoto);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      }
    } catch (error) {
      console.log('Error uploading file', error);
      throw error;
    }
  }
  const handleUpdateAvatar = async () => {
    try {
      const photoURL = await handleUploadAvatar();
      const payload = {
        user,
        photoURL,
      }
      await dispatch(updateUserDocument(payload as UpdateUserPayload));
      notify('success');
    } catch (error) {
      console.log('Error updating profile. Please try again.', error);
      notify('error');
    }
  }
  const handleStatusUpdate = async () => {
    if (editStatus && status !== currentUser.status) {
      try {
        dispatch(updateUserDocument({ user, status } as UpdateUserPayload));
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
        dispatch(updateUserDocument({ user, aboutMe } as UpdateUserPayload));
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
      <Card sx={{ position: 'relative' }}>
        <Banner sx={{ backgroundColor: `${currentUser.bannerColor}` }}></Banner>
        <Button sx={{
          display: showSaveAvatar ? 'block' : 'none',
          marginTop: '20px',
          position: 'absolute',
          right: '40px'
        }} variant="contained"
          onClick={handleUpdateAvatar}>
          Save Avatar
        </Button>

        {/* Avatar */}
        <Box
          sx={{
            position: "absolute",
            top: "100px",
            transform: "translate(40px, -40%)",
            display: 'inline-block',
          }}
          onMouseEnter={() => setAvatarIsHovered(true)}
          onMouseLeave={() => setAvatarIsHovered(false)}
        >
          <Avatar
            src={uploadedPhoto ? URL.createObjectURL(uploadedPhoto) : currentUser.photoURL}
            sx={{
              width: 120,
              height: 120,
              border: `8px ${darkTheme.palette.background.default} solid`,
              position: 'relative'
            }}
          >
            {currentUser.displayName}
          </Avatar>
          {avatarIsHovered && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1,
              },
            }}>
              <label htmlFor="avatar-input">
                <EditRoundedIcon fontSize="large" />
              </label>
              <input
                multiple={false}
                type="file"
                id="avatar-input"
                accept="image/png, image/jpeg"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                }}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setUploadedPhoto(e.target.files[0]);
                  }
                  setShowSaveAvatar(true);
                }}
              />
            </Box>
          )}

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
