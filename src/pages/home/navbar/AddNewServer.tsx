import AddIcon from '@mui/icons-material/Add';
import CustomTooltip from "../../../components/CustomTooltip";
import ServerButton from "../../../components/ServerButton";
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const NavigationAction = () => {
  // const [open, setOpen] = useState(true);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  return (
    <div>
        <CustomTooltip title="Add a new server">
            <ServerButton>
                <AddIcon color="primary" fontSize="medium" sx={{ "&:hover": { color: "white" } }}/>
            </ServerButton>
        </CustomTooltip>
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              Modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, itaque?
              </Typography>
          </Box>
      </Modal> */}
    </div>
  )
}

export default NavigationAction