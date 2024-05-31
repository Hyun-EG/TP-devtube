import React from 'react';
import styled from 'styled-components';

const ButtonGroupContainer = styled.div`
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
    background-color: #065FD4;
    color: white;
  }

  &.cancel {
    background-color: #D9D9D9;
  }

  &.delete {
    background-color: #FF0000;
    color: white;
  }
`;

const Buttons = ({ onSave, onCancel, onDelete, showDelete }) => (
  <ButtonGroupContainer>
    <Button className="save" type="button" onClick={onSave}>
      저장
    </Button>
    <Button className="cancel" type="button" onClick={onCancel}>
      작성 취소
    </Button>
    {showDelete && (
      <Button className="delete" type="button" onClick={onDelete}>
        삭제
      </Button>
    )}
  </ButtonGroupContainer>
);

export default Buttons;
