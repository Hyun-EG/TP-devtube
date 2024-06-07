import React from 'react';
import TimePickerInput from './TimePickerInput';
import '../../styles/components/calendar/_eventModal.scss';
import ColorPicekrInput from './ColorPickerInput'

const ModalInputs = ({
	label,
	type,
	value,
	onChange,
	required,
	error,
	errorMessage
}) => (
	<div className="form-field">
		<label className="label">{label}</label>
		<div className="input-container">
			{type === 'textarea' && (
				<textarea
					className={`textarea ${error ? 'error' : ''}`}
					value={value}
					onChange={onChange}
					required={required}
				/>
			)}
			{type === 'text' && (
				<input
					className={`input ${error ? 'error' : ''}`}
					type={type}
					value={value}
					onChange={onChange}
					required={required}
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
			{type === 'colorbar' && (
				<ColorPicekrInput
					type={type}
					value={value}
					onChange={onChange}
					placeholder={label}
					error={error}
				/>
			)}
			{error && <div className="error-message">{errorMessage}</div>}
		</div>
	</div>
);

export default ModalInputs;
