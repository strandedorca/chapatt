import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { darkTheme } from "../../theme";

const ProfilePage = () => {
  const [color, setColor] = useState("#000000");

  const handleColorChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setColor(event.target.value);
  };

  // show password
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownCurrentPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownNewPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleColorSubmit = () => {
    // Handle color submission
    console.log("Selected color:", color);
  };

  return (
    <div>
      <List sx={{ backgroundColor: darkTheme.palette.background.paper }}>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "67%",
          }}
        >
          {/* HEADING */}
          <h1>Profile</h1>
        </ListItem>

        {/* HEADER */}
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* USER NAME */}
          <TextField
            id="outlined-basic"
            label="USER NAME"
            variant="outlined"
            sx={{ width: "500px", height: "auto" }}
          />

          {/* UPLOAD */}
          <ListItem>
            <ListItem sx={{ display: "flex", flexDirection: "column" }}>
              <ListItemText primary="AVATAR" />
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
              >
                Change Avatar
                <input type="file" hidden />
              </Button>
            </ListItem>

            {/* DELETE BUTTON */}
          </ListItem>
        </ListItem>

        {/* CONTENT */}
        {/* BANNER COLOR */}
        <ListItem sx={{ display: "flex", padding: "20px", gap: "20px" }}>
          <TextField
            type="color"
            value={color}
            onChange={handleColorChange}
            label="Select color"
            sx={{
              width: "150px",
              height: "50px",
            }}
          />
          <Button variant="contained" onClick={handleColorSubmit}>
            Change Color
          </Button>
        </ListItem>

        {/* TEXT AREA */}
        <ListItem sx={{ display: "flex", gap: "5ch" }}>
          <TextField
            id="filled-multiline-static"
            label="Say somthing"
            multiline
            rows={4}
            defaultValue=""
            variant="filled"
          />
          <Button variant="contained">SAVE</Button>
        </ListItem>

        {/* PASSWORD */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <div>
            <h2>Password</h2>
            <ListItemText primary="Current Password" />
            <FormControl
              sx={{ m: 1, width: "25ch", display: "block" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownCurrentPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Current Password"
              />
            </FormControl>
          </div>

          {/* New pw */}
          <div>
            <ListItemText primary="New Password" />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownNewPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>
          </div>

          {/* Confirm ps */}
          <div>
            <ListItemText primary="Confirm Password" />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </div>
        </Box>
      </List>
    </div>
  );
};

export default ProfilePage;
