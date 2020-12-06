import * as React from "react";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const NewAuctionModal = ({show, onHide, addToAuctions}) => {
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.minBid = 0;
    formDataObj.imageUrl = "https://www.watershedcabins.com/uploads/for-sale-sign-e1509648047898-400x234.jpg";

    addToAuctions(currentItemList => [...currentItemList, formDataObj]);

    if (form.checkValidity() === true) {
      onHide();
    }
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>New Auction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              placeholder="Please provide a valid item name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              name="description"
              as="textarea"
              rows={3}
              placeholder="Please provide a valid description"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.File name="image" label="Image Upload (optional)" />
          </Form.Group>
          <Button className="align-self-end" type="submit">Submit form</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

NewAuctionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  addToAuctions: PropTypes.func.isRequired,
};

export default NewAuctionModal;