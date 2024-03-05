import { Button, Modal, Typography, styled } from '@mui/material';

import { Box } from "@mui/system";
import { darkTheme } from './../../../theme.ts';
import Toast from '../../../components/Toast.tsx';

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

interface ConfirmationDialogProp {
    openState: boolean,
    handleClose: () => void,
    handleConfirm: () => void,
    handleCancel: () => void,
}

const ConfirmationDialog = ({ openState, handleCancel, handleClose, handleConfirm }: ConfirmationDialogProp) => {
    return (
        <>
            <Toast />
            <Modal
                open={openState}
                onClose={handleClose}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
            >
                <BoxModal>
                    <Typography id="delete-modal-title" variant="h6" component="h2" align="center" gutterBottom>
                        Leaving Confirm
                    </Typography>
                    <Typography id="delete-modal-description" variant="body1" component="p" align="center" gutterBottom>
                        Are you sure you want to leave this server?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button variant="contained" color="error"
                            onClick={handleConfirm}
                        >
                            Confirm
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
        </>
    )
}
export default ConfirmationDialog