import React from "react";
import { Button, Modal } from "semantic-ui-react";
import "./ModalBasic.scss";

export function ModalBasic(props) {
  const { show, size, title, children, onClose } = props;
  return (
    <Modal
      className="modal-basic"
      open={show}
      onClose={onClose}
      closeOnDimmerClick={true}
      size={size}
    >
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Cerrar</Button>
      </Modal.Actions>
    </Modal>
  );
}

Modal.defaultProps = {
  size: "tiny",
};
