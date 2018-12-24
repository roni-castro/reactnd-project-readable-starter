import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalConfirmation = ({ title, message, handleSubmit, isModalOpen, toggleModal }) => (
  <Modal isOpen={isModalOpen} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
    <ModalBody>{message}</ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toggleModal}>No</Button>
      <Button color="danger" onClick={handleSubmit}>Yes</Button>{' '}
    </ModalFooter>

  </Modal>
)

ModalConfirmation.propType = {
  isModalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

export default ModalConfirmation;