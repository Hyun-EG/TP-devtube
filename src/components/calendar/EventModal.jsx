import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import ModalInputs from './ModalInputs';
import Buttons from './Buttons';

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

const EventModal = ({ isOpen, onRequestClose, onSubmit, onDelete, event, headerTitle }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [note, setNote] = useState('');

  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'title을 입력해 주세요.';
    if (!start) newErrors.start = 'start를 입력해 주세요.';
    if (!end) newErrors.end = 'end를 입력해 주세요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

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
        <ModalHeader>{headerTitle}</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalInputs
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            error={!!errors.title}
            errorMessage={errors.title}
          />
          <ModalInputs
            label="Start"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
            error={!!errors.start}
            errorMessage={errors.start}
          />
          <ModalInputs
            label="End"
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
            error={!!errors.end}
            errorMessage={errors.end}
          />
          <ModalInputs
            label="Note"
            type="textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Buttons
            onSave={handleSubmit}
            onCancel={onRequestClose}
            onDelete={handleDelete}
            showDelete={!!event}
          />
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventModal;
