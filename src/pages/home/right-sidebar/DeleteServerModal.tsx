import { Button, Modal, Typography, styled } from '@mui/material';

import { Box } from "@mui/system";
import { darkTheme } from '../../../theme';

const BoxModal = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: `calc(50% - 50px)`,
    left: "50%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[24],
    opacity: 0.9,
    maxWidth: 400,
    padding: 24,
    transform: "translate(-50%, -50%)",
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
}));

interface DeleteServerModalProp {
    openState: boolean,
    handleClose: () => void,
    handleConfirm: () => void,
    handleCancel: () => void,
}

const DeleteServerModal = ({ openState, handleCancel, handleClose, handleConfirm }: DeleteServerModalProp) => {
    return (
        <Modal
            open={openState}
            onClose={handleClose}
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
        >
            <BoxModal>
                <Typography id="delete-modal-title" variant="h6" component="h2" align="center" gutterBottom>
                    Confirm Delete Server
                </Typography>
                <Typography id="delete-modal-description" variant="body1" component="p" align="center" gutterBottom>
                    We believe in democracy. Any member can choose a server's fate. But great power comes great responsibility. Are you sure you want to delete this server for you and every other member?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button variant="contained" color="error"
                        onClick={handleConfirm}
                    >
                        Confirm. I am responsible for the deletion of this server.
                    </Button>
                    <Button variant="contained"
                        sx={{ ml: 2, bgcolor: darkTheme.palette.grey[500], color: darkTheme.palette.text.primary }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Box>
            </BoxModal>
        </Modal>
    )
}
export default DeleteServerModal