import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import '../../styles/components/calendar/_eventModal.scss';

// 한국어 로케일 등록
registerLocale('ko', ko);

const TimePickerInput = ({ selectedDate, onChange, placeholder, error }) => (
	<ReactDatePicker
		className={`timepicker ${error ? 'error' : ''}`}
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
	/>
);

export default TimePickerInput;
