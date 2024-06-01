import React, { useEffect, useState } from 'react';
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
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setStart(event.start ? new Date(event.start) : new Date());
      setEnd(event.end ? new Date(event.end) : new Date());
      setNote(event.note || '');
    } else {
      setTitle('');
      setStart(new Date());
      setEnd(new Date());
      setNote('');
    }
  }, [event]);

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = '제목을 입력해 주세요.';
    if (!start) newErrors.start = '시작일을 입력해 주세요.';
    if (!end) newErrors.end = '종료일을 입력해 주세요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedEvent = {
      ...event,
      title,
      start,
      end,
      note,
    };

    onSubmit(updatedEvent);
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
            label="제목"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            error={!!errors.title}
            errorMessage={errors.title}
          />
          <ModalInputs
            label="시작"
            type="date"
            value={start}
            onChange={setStart}
            required
            error={!!errors.start}
            errorMessage={errors.start}
          />
          <ModalInputs
            label="종료"
            type="date"
            value={end}
            onChange={setEnd}
            required
            error={!!errors.end}
            errorMessage={errors.end}
          />
          <ModalInputs
            label="메모"
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
