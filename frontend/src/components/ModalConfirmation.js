import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        modal: nextProps.show
      })
    }
  }

  onConfirm = () => {
    this.toggle()
    this.props.onConfirm()
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.message}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.onConfirm()}>Yes</Button>
            <Button color="secondary" onClick={() => this.toggle()}>No</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalConfirmation.propType = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default ModalConfirmation;