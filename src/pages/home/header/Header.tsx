import { ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Button, Divider, Tooltip } from "@mui/material";
import {
  PeopleAltRounded,
  Notifications,
  PushPin,
  WifiCalling3,
} from "@mui/icons-material";
import styles from "../../../App.module.css";
import { darkTheme } from "../../../theme";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentList,
  setCurrentList,
} from "../../../redux-slices/friendsSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase";
import AddFriendModal from "./AddFriendModal";
import { useTheme } from "@mui/system";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "auto",
  height: "auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  display: "flex",
  alignItems: "center",
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.15, 1),
    transition: "all 0.3s",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    width: "50px",
    "&:focus": {
      width: "200px",
    },
    [theme.breakpoints.up("md")]: {
      width: "14ch",
    },
  },
}));
const CustomIconButton = styled(IconButton)(({ theme }) => ({
  color: "inherit",
  "&:focus": {
    outline: "none",
  },
  "&:hover": {
    color: theme.palette.common.white,
  },
}));
const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  textTransform: "none",
  fontSize: "1em",
  fontWeight: "400",
  marginRight: "10px",
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Header() {
  const currentList = useSelector(selectCurrentList);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const { pathname } = location;

  // State management for add friend feature
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  // Add Friend Modal
  const handleAddFriend = () => {
    setModalOpen(true);
  };
  const handleCloseAddFriend = () => {
    setModalOpen(false);
  };

  const renderHeader = () => {
    // Render different headers based on pathname
    if (pathname === "/me") {
      return (
        <ThemeProvider theme={darkTheme}>
          {/* Modal */}
          <AddFriendModal
            modalOpen={modalOpen}
            handleClose={handleCloseAddFriend}
          />

          {/* Main */}
          <AppBar position="sticky">
            <Toolbar
              style={{ minHeight: "48px" }}
              sx={{ justifyContent: "space-between" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <PeopleAltRounded />
                  Friends
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <CustomButton
                  onClick={() => dispatch(setCurrentList("friends"))}
                  sx={
                    currentList === "friends"
                      ? { backgroundColor: theme.palette.background.paper }
                      : null
                  }
                >
                  All
                </CustomButton>
                <CustomButton
                  onClick={() => dispatch(setCurrentList("pending"))}
                  sx={
                    currentList === "pending"
                      ? { backgroundColor: theme.palette.background.paper }
                      : null
                  }
                >
                  Pending
                </CustomButton>
                <CustomButton
                  onClick={() => dispatch(setCurrentList("blocked"))}
                  sx={
                    currentList === "blocked"
                      ? { backgroundColor: theme.palette.background.paper }
                      : null
                  }
                >
                  Blocked
                </CustomButton>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{
                    backgroundColor: darkTheme.palette.primary.main,
                    color: "black",
                    mx: 2,
                    "&:focus": {
                      color: darkTheme.palette.success.main,
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={handleAddFriend}
                >
                  Add Friend
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={darkTheme}>
          <AppBar position="sticky">
            <Toolbar
              style={{ minHeight: "48px" }}
              sx={{ justifyContent: "space-between" }}
            >
              {pathname.startsWith("/me/") ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt={user?.displayName || ""}
                    src={user?.photoURL || ""}
                    sx={{ width: 24, height: 24 }}
                  />
                  <Tooltip title={user?.displayName} arrow>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{ px: 1.5, fontSize: "1rem", cursor: "pointer" }}
                    >
                      {user?.displayName}
                    </Typography>
                  </Tooltip>
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h4"
                    color={darkTheme.palette.grey[600]}
                    component="div"
                  >
                    #
                  </Typography>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ px: 1.5, fontSize: "1rem", cursor: "pointer" }}
                  >
                    general
                  </Typography>
                </Box>
              )}

              <Box
                sx={{ display: "flex" }}
                color={darkTheme.palette.text.secondary}
              >
                <CustomIconButton>
                  <Tooltip title="Start Voice Call" arrow>
                    <WifiCalling3 />
                  </Tooltip>
                </CustomIconButton>
                {/* <CustomIconButton>
                                    <Tooltip title="Start Video Call" arrow>
                                        <Videocam />
                                    </Tooltip>
                                </CustomIconButton> */}
                <CustomIconButton>
                  <Tooltip title="Pined Messages" arrow>
                    <PushPin />
                  </Tooltip>
                </CustomIconButton>

                {/* <CustomIconButton>
                                    <Tooltip title="Show/Hide User Profile" arrow>
                                        <AccountCircle />
                                    </Tooltip>
                                </CustomIconButton> */}

                <Search>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                </Search>

                <CustomIconButton>
                  <Tooltip title="Notification Settings" arrow>
                    <Notifications />
                  </Tooltip>
                </CustomIconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      );
    }
  };

  return renderHeader();
}
