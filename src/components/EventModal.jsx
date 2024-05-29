import dayjs from 'dayjs';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

// Styled components for the modal
const StyledModal = styled(Modal)`
  .ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .ReactModal__Content {
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    width: 400px;    
    border: 1px solid #ccc;    
    overflow: auto;
    border-radius: 10px;
    outline: none;
    padding: 20px;
  }
`;

const ModalHeader = styled.h2`
  margin-top: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-left: 100px;
  padding-right: 100px;
  height: 80vh;  
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;  

  &.save {
    background-color: #007bff;
    color: white;
  }

  &.cancel {
    background-color: #ccc;
  }
`;

const EventModal = ({ isOpen, onRequestClose, onSubmit, event }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStart(moment(event.start).format('YYYY-MM-DDTHH:mm'));
      setEnd(moment(event.end).format('YYYY-MM-DDTHH:mm'));
      setNote(event.note || '')
    }
  }, [event]);

  const handleSubmit = () => {
    onSubmit({
      ...event,
      title,
      start,
      end,
      note,
    });
    onRequestClose();
  };

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Event">
      <ModalHeader>Edit Event</ModalHeader>
      <Form>
        <FormField>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label>Start</Label>
          <Input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label>End</Label>
          <Input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </FormField>
        <ButtonGroup>
          <Button className="save" type="button" onClick={handleSubmit}>
            Save
          </Button>
          <Button className="cancel" type="button" onClick={onRequestClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </StyledModal>
  );
};

export default EventModal;