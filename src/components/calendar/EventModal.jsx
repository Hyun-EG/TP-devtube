// EventModal.js
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
`;

const ModalHeader = styled.h2`
  margin-top: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

  &.delete {
    background-color: #ff4d4d;
    color: white;
  }
`;

const EventModal = ({ isOpen, onRequestClose, onSubmit, onDelete, event }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setStart(moment(event.start).format('YYYY-MM-DDTHH:mm') || '');
      setEnd(moment(event.end).format('YYYY-MM-DDTHH:mm') || '');
      setNote(event.note || '');
    } else {
      setTitle('');
      setStart('');
      setEnd('');
      setNote('');
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

  const handleDelete = () => {
    onDelete(event.id);
    onRequestClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onRequestClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>{event ? 'Edit Event' : 'New Event'}</ModalHeader>
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
            {event && (
              <Button className="delete" type="button" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventModal;
