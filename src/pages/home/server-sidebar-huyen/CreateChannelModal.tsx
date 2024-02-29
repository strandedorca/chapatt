import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import Switch from "@material-ui/core/Switch";


interface CreateChannelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateChannel: React.FC<CreateChannelProps> = ({ isOpen, onClose }) => {
  const [channelType, setChannelType] = useState("text");
  const [channelName, setChannelName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleChannelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChannelType((event.target as HTMLInputElement).value);
  };

  const handleChannelNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChannelName(event.target.value);
  };

  const handlePrivateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(event.target.checked);
  };

  const handleSubmit = () => {
    // Handle the submit logic here
    console.log({
      channelType,
      channelName,
      isPrivate,
    });
    // Close the modal after submit
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="create-channel-modal"
      aria-describedby="create-channel-modal-form"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h1" component="h2">
          Create Channel
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">CHANNEL TYPE</FormLabel>
          <RadioGroup
            row
            aria-label="channelType"
            name="channelTypeRow"
            value={channelType}
            onChange={handleChannelTypeChange}
          >
            <FormControlLabel value="text" control={<Radio />} label="Text" />
            <FormControlLabel value="voice" control={<Radio />} label="Voice" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="new-channel"
          variant="outlined"
          fullWidth
          margin="normal"
          value={channelName}
          onChange={handleChannelNameChange}
        />
        <FormGroup>
        <FormControlLabel
        sx={{
          display: 'block',
        }}
        control={
          <Switch
            checked={isPrivate}
            onChange={handlePrivateChange}
            name="loading"
            color="primary"
          />
        }
        label="Private Channel"
      />
        </FormGroup>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Create Channel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateChannel;
