import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import styled from 'styled-components';
import './css/csstest.css';

// 한국어 로케일 등록
registerLocale('ko', ko);

const TimePicker = styled(ReactDatePicker)`
	padding: 8px 10px 8px 35px !important;
	font-size: 1rem;
	border: ${props => (props.error ? '1px solid red' : '1px solid #ccc')};
	width: 100%;
	box-sizing: border-box;
	border-radius: 4px;
`;

const TimePickerInput = ({ selectedDate, onChange, placeholder, error }) => (
	<TimePicker
		showIcon
		selected={selectedDate}
		onChange={onChange}
		dateFormat="yyyy년 MM월 dd일 a hh시"
		dateFormatCalendar="yyyy년 MM월"
		locale="ko"
		showTimeSelect
		timeFormat="HH:mm"
		timeIntervals={30}
		timeCaption="시간"
		placeholderText={placeholder}
		error={error}
	/>
);

export default TimePickerInput;
