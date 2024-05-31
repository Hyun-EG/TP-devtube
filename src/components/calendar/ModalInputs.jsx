import React from 'react';
import styled from 'styled-components';
// import TimePickerInput from './TimePickerInput';

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
  border: ${props => props.error ? '1px solid red' : '1px solid #ccc'};
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  border: ${props => props.error ? '1px solid red' : '1px solid #ccc'};
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
`;

const ModalInputs = ({ label, type, value, onChange, required, error, errorMessage }) => (
  <FormField>
    <Label>{label}</Label>
    {type === 'textarea' ? (
      <TextArea value={value} onChange={onChange} required={required} error={error} />
    ) : (
      <Input type={type} value={value} onChange={onChange} required={required} error={error} />
    )}
    {error && <ErrorMessage>{errorMessage}</ErrorMessage>}

  </FormField>
);

export default ModalInputs;

