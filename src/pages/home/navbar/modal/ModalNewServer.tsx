import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Slide,
  styled,
  useTheme,
  IconButton,
  TextField,
} from "@mui/material";
import { AddAPhoto, ArrowForwardIos, Close } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux-slices/currentUserSlice";
import { addNewServer } from "../../../../redux-slices/serverSlice";
import { isValidUsername } from "../../../../components/helper-functions";
import { db, storage } from "../../../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AppDispatch } from "../../../../main";
import { doc, getDoc, collection } from "firebase/firestore";
import JoinServerModal from "./JoinServerModal";
import { toast } from "react-toastify";
import Toast from "../../../../components/Toast";

const BoxModalSerVer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "18%",
  left: "38%",
  transform: "translate(-50%, -50%)",
  overflow: "hidden",
  width: 400,
  height: 480,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const BoxModal = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  overflow: "auto",
  height: 300,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  scrollbarWidth: "thin",
  scrollbarColor: `${theme.palette.background.default} ${theme.palette.background.paper}`,
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  marginBottom: theme.spacing(1),
  justifyContent: "space-between",
  width: "100%",
  outline: "none",
  border: `1px solid ${theme.palette.grey[800]}`,
  color: theme.palette.grey[400],
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
}));

const BackButton = styled(Button)(({ }) => ({
  outline: "none",
  border: "none",
  color: "white",
  display: "block",
  "&:hover": {
    backgroundColor: "transparent",
    outline: "none",
    border: "none",
  },
}));

const UpLoadButton = styled("label")(({ theme }) => ({
  backgroundColor: `${theme.palette.background.default}`,
  borderRadius: "50%",
  width: "100px",
  position: "relative",
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  fontSize: 18,
  "&:hover": {
    backgroundColor: `${theme.palette.primary.main}`,
    opacity: ".8",
    color: `${theme.palette.background.default}`,
    cursor: "pointer",
  },
}));
const PhotoContainer = styled("div")({
  position: "absolute",
  overflow: "hidden",
  borderRadius: "50%",
  top: "0",
  width: "100px",
  height: "100px",
});

type OptionsType = {
  [key: number]: string[];
};

const options: OptionsType = {
  1: [
    "Create My Own",
    "Gaming",
    "School Club",
    "Study Group",
    "Friends",
    "Artists & Creators",
    "Local Community",
  ],
  2: ["For a club or community", "For me and my friends"],
};

type ModalServerProps = {
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  handleModalClose: () => void;
};

const ArrowIcon = styled(ArrowForwardIos)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const ModalServer: React.FC<ModalServerProps> = ({
  currentStep,
  goToNextStep,
  goToPreviousStep,
  handleModalClose,
}) => {
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [serverNameError, setServerNameError] = useState("");

  const handleUploadPhoto = async () => {
    try {
      if (uploadedPhoto !== null) {
        const imageRef = ref(storage, `/avatar/servers/${serverName}`);
        const snapshot = await uploadBytes(imageRef, uploadedPhoto);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      }
    } catch (error) {
      console.log('Error uploading file', error);
      throw error;
    }
  };

  const handleCreateServer = async () => {
    try {

      if (!serverName) {
        setServerNameError("Server name is required");
      } else if (!isValidUsername(serverName)) {
        setServerNameError("Must not contain special character.");
      } else {
        // Check if servername already exists
        const serverRef = doc(collection(db, "servers"), serverName);
        const serverDoc = await getDoc(serverRef);
        if (serverDoc.exists()) {
          setServerNameError(`Server ${serverName} already exists. Please choose another name`);
        } else {
          // If not, proceed to create a new server
          const photoURL = await handleUploadPhoto();
          console.log('Photo URL', photoURL);
          dispatch(addNewServer({ serverName, username, photoURL }));
          handleModalClose();
        }
      }
    } catch (error) {
      console.log('Error creating server. Please try again.');
    }
  };

  const renderStepContent = (step: number) => {
    // Dynamically create buttons based on the current step
    return (
      options[step]?.map((option, index) => (
        <StyledButton key={index} variant="contained" onClick={goToNextStep}>
          {option} <ArrowIcon />
        </StyledButton>
      )) || (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <UpLoadButton aria-label="upload picture">
            <input
              hidden
              multiple={false}
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setUploadedPhoto(e.target.files[0]);
                }
              }}
            />
            <AddAPhoto fontSize="large" />

            {uploadedPhoto && (
              <PhotoContainer>
                <img
                  src={URL.createObjectURL(uploadedPhoto)}
                  alt="Uploaded"
                  style={{ maxWidth: "100%", objectFit: "cover" }}
                />
              </PhotoContainer>
            )}
          </UpLoadButton>

          <Typography variant="body2" color="textSecondary">
            Give your new server a personality with a name and an icon. You can
            always change it later.
          </Typography>
          <TextField
            fullWidth
            label="SERVER NAME"
            variant="outlined"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            error={Boolean(serverNameError)}
            helperText={serverNameError}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            fontSize={10}
            sx={{ alignSelf: "flex-start" }}
          >
            By creating a server, you agree to Discord's{" "}
            <NavLink to={""} style={{ color: theme.palette.info.dark }}>
              Community Guidelines.
            </NavLink>
          </Typography>
        </Box>
      )
    );
  };
  const theme = useTheme();
  const currentUser = useSelector(selectCurrentUser);
  const username = currentUser.username;
  const [serverName, setServerName] = useState(`${currentUser.username}server`);
  const dispatch: AppDispatch = useDispatch();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const navigate = useNavigate();
  const notify = (input: string) => {
    if (input === 'JOIN_SUCCESS') {
      toast.success('Join server successfully.')
    } else if (input === 'JOIN_FAILED') {
      toast.error('Failed to join server.')
    }
  }

  return (
    <>
      <Toast />
      <JoinServerModal
        modalOpen={showJoinModal}
        handleClose={() => {
          setShowJoinModal(false);
          handleModalClose();
          navigate(`/servers/${serverName}`);
        }}
        notify={notify}
      />
      <Slide direction="left" in={currentStep > 0} mountOnEnter unmountOnExit>
        <BoxModalSerVer>
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          <Typography
            id="create-server-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
            py={2}
          >
            {currentStep === 1
              ? "Create Your Server"
              : currentStep === 2
                ? "Tell Us More About Your Server"
                : "Customise Your Server"}
          </Typography>
          <Typography component="div">
            {currentStep === 1
              ? "Your server is where you and your friends hang out. Make yours and start talking."
              : currentStep === 2
                ? "In order to help you with your setup, is your new server for just a few friends or a larger community?"
                : "Give your new server a personality with a name and an icon. You can always change it later."}
          </Typography>
          <BoxModal
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              overflow: "auto",
              maxHeight: 250,
            }}
          >
            {renderStepContent(currentStep)}
          </BoxModal>
          {currentStep === 1 ? (
            <>
              <Typography sx={{ mt: 2, textAlign: "center" }}>
                {/* Already have an invite? */}
              </Typography>
              <Button
                variant="text"
                sx={{
                  width: "100%",
                  mt: 1,
                  backgroundColor: theme.palette.grey[800],
                  color: "white",
                  "&:hover": { backgroundColor: theme.palette.grey[700] },
                }}
                onClick={() => setShowJoinModal(true)}
              >
                Join a Server
              </Button>
            </>
          ) : currentStep === 2 ? (
            <Typography sx={{ mt: 2, textAlign: "center" }}>
              {/* Not sure? You can <NavLink to={''} style={{ color: theme.palette.info.dark }}>skip question</NavLink> for now. */}
              <BackButton variant="outlined" onClick={goToPreviousStep}>
                Back
              </BackButton>
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mt: 4,
                color: "white",
              }}
            >
              <BackButton variant="text" onClick={goToPreviousStep}>
                Back
              </BackButton>
              <Button
                variant="contained"
                color="inherit"
                sx={{ backgroundColor: theme.palette.info.dark }}
                onClick={handleCreateServer}
              >
                Create
              </Button>
            </Box>
          )}
        </BoxModalSerVer>
      </Slide>
    </>
  );
};

export default ModalServer;
