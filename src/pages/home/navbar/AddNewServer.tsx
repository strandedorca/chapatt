// AddNewServer.tsx
import React, { useState } from 'react';
import { Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTooltip from "../../../components/CustomTooltip";
import ServerButton from "../../../components/ServerButton";
import ModalServer from './modal/ModalNewServer';

const AddNewServer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <CustomTooltip title="Add a new server">
        <ServerButton onClick={handleModalOpen}>
          <AddIcon fontSize="medium" />
        </ServerButton>
      </CustomTooltip>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
      >
        <>
          <ModalServer
            currentStep={currentStep}
            goToNextStep={goToNextStep}
            handleModalClose={handleModalClose}
            goToPreviousStep={goToPreviousStep}
          />
        </>
      </Modal>
    </div>
  );
}

export default AddNewServer;
