import React from "react";
import { Theme } from "@emotion/react";
import {
  Button,
  ButtonGroup,
  FormControlLabel,
  MenuItem,
  MenuList,
  Paper,
  Radio,
  Typography,
  styled,
} from "@mui/material";

// Style cho checkbox
// Phần này để di chuyển vị trí cho checkbox khi merge vào file tổng
const CustomFormControlLabelGroup = styled("div")({
  position: "absolute",
  // Di chuyển vị trí box
  left: "1%",
  top: "3%",
  display: "inline-block",
  backgroundColor: "#111214",
  width: "30%px",
  borderRadius: "5px",
  color: "#5b5e62",
});

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  display: "block",
  marginBottom: "5%",
}));
// Button cho popupSetMute
const CustomButton = styled(Button)(({ theme }) => ({
  width: "250px",
  height: "50px",
  marginBottom: "-4%",
  color: "#5b5e62",
  "&:hover": {
    backgroundColor: "#4752c4",
    color: "white",
  },
}));

const NotificationPopupSetting = () => {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  // Xem có mở hay không
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const changePopup = (event) => {
    setIsOpenPopup(event.target.value);
  };

  const clickOpenMute = () => {
    setIsOpenPopup(true);
  };

  const clickCloseMute = () => {
    setIsOpenPopup(false);
  };
  // style cho button Popup setMute
  const ButtonPopUpMute = styled(ButtonGroup)(({ theme }) => ({
    position: "relative",
    left: "150px",
    backgroundColor: "white",
  }));

  // Control để add màu
  const RadioColor = styled(Radio)(({ theme }) => ({
    color: "white",
  }));

  return (
    <>
      {/* Button để click mở popup mute */}

      {/* Popup setup thời gian mute */}
      <ButtonPopUpMute>
        {isOpenPopup && (
          <Paper
            onClick={clickCloseMute}
            sx={{
              width: 230,
              position: "relative",
              left: "50%",
              backgroundColor: "#111214",
              color: "#5b5e62",
              top: "10px",
            }}
          >
            <MenuList>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "#4752c4",
                    color: "white",
                  },
                }}
              >
                <Typography variant="inherit">For 15 minutes</Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "#4752c4",
                    color: "white",
                  },
                }}
              >
                <Typography variant="inherit">For 1 hour</Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "#4752c4",
                    color: "white",
                  },
                }}
              >
                <Typography variant="inherit" noWrap>
                  For 3 hours
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "#4752c4",
                    color: "white",
                  },
                }}
              >
                <Typography variant="inherit" noWrap>
                  For 8 hours
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "#4752c4",
                    color: "white",
                  },
                }}
              >
                <Typography variant="inherit" noWrap>
                  For 24 hours
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: "#4752c4",
                    color: "white",
                  },
                }}
              >
                <Typography variant="inherit" noWrap>
                  Until I turn on back
                </Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        )}
      </ButtonPopUpMute>

      {/* Label và input chọn chế độ */}
      <CustomFormControlLabelGroup>
        {/* Đây là button mở Popup */}
        <CustomButton color="primary" onClick={clickOpenMute}>
          Mute Channel
        </CustomButton>
        <hr style={{ width: "90%" }}></hr>

        {/* Đây là Box Check Radio chọn  */}
        <CustomFormControlLabel
          value="a"
          control={
            <RadioColor
              checked={selectedValue === "a"}
              onChange={handleChange}
            />
          }
          label="Use Catalogy Default"
          labelPlacement="start"
        />
        <CustomFormControlLabel
          value="b"
          control={
            <RadioColor
              checked={selectedValue === "b"}
              onChange={handleChange}
            />
          }
          label="All messages"
          labelPlacement="start"
        />
        <CustomFormControlLabel
          value="c"
          control={
            <RadioColor
              checked={selectedValue === "c"}
              onChange={handleChange}
            />
          }
          label="Only @mentions"
          labelPlacement="start"
        />
        <CustomFormControlLabel
          value="d"
          control={
            <RadioColor
              checked={selectedValue === "d"}
              onChange={handleChange}
            />
          }
          label="Nothing"
          labelPlacement="start"
        />
      </CustomFormControlLabelGroup>
    </>
  );
};

export default NotificationPopupSetting;
