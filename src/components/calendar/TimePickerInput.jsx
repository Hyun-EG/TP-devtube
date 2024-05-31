import dayjs from 'dayjs';
// ▼ KST timezone
// import 'dayjs/locale/ko'
import ko from 'date-fns/locale/ko';
import React, { useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


// ▼ 로컬라이저(지역화)
registerLocale('ko', ko);

export const TimePickerStart = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <ReactDatePicker
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="yyyy년 MM월 dd일 a hh시"
      dateFormatCalendar="yyyy년 MM월"
      locale="ko"
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      timeCaption="시작"
      placeholderText="시작일"
    />

  );
}

export const TimePickerEnd = () => {
  const [endDate, setEndDate] = useState(new Date());
  return (
    <>
      <ReactDatePicker
        showIcon
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        dateFormat="yyyy년 MM월 dd일 a hh시"
        dateFormatCalendar="yyyy년 MM월"
        locale="ko"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        timeCaption="종료"
        placeholderText="시작일"
      />
    </>

  );
}



// date pick 사용해서 모달창 input 날짜 시간 선택할 수 있게 하기
// https://velog.io/@ebokyung/DatePicker-%EC%BB%A4%EC%8A%A4%ED%85%80-%EB%B0%8F-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0-%EA%B8%B0%EA%B0%84-%EB%82%A0%EC%A7%9C%EC%99%80-%EC%8B%9C%EA%B0%84
// https://velog.io/@h1225hs/react-datepicker-%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95
// https://reactdatepicker.com/