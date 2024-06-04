import React from 'react';
import styled from 'styled-components';
import TimePickerInput from './TimePickerInput';

const FormField = styled.div`
	margin-bottom: 1rem;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	margin-bottom: 0.5rem;
	font-weight: 500;
`;

const Input = styled.input`
	padding: 0.5rem;
	font-size: 1rem;
	border-radius: 4px;
	border: ${props => (props.error ? '1px solid #cc0000' : '1px solid #ccc')};
`;

const TextArea = styled.textarea`
	padding: 0.5rem;
	font-size: 1rem;
	border-radius: 4px;
	border: ${props => (props.error ? '1px solid #cc0000' : '1px solid #ccc')};
`;

const ErrorMessage = styled.div`
	color: #cc0000;
	font-size: 0.875rem;
`;

const ModalInputs = ({
	label,
	type,
	value,
	onChange,
	required,
	error,
	errorMessage
}) => (
	<FormField>
		<Label>{label}</Label>
		<InputContainer>
			{type === 'textarea' && (
				<TextArea
					value={value}
					onChange={onChange}
					required={required}
					error={error}
				/>
			)}
			{type === 'text' && (
				<Input
					type={type}
					value={value}
					onChange={onChange}
					required={required}
					error={error}
				/>
			)}
			{type === 'date' && (
				<TimePickerInput
					selectedDate={value}
					onChange={onChange}
					placeholder={label}
					error={error}
				/>
			)}
			{error && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</InputContainer>
	</FormField>
);

export default ModalInputs;
