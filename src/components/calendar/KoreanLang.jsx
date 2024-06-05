// 참조: https://jquense.github.io/react-big-calendar/examples/?path=/docs/props--formats
// 날짜 표기 방식 정리.

export const messages = {
  showMore: total => `더 보기(${total}개)`, // 'show more'를 '더 보기'로 수정
  previous: '<',
  next: '>',
  month: '월',
  week: '주',
  day: '일',
  agenda: '상세',
  yesterday: '어제 자',
  tomorrow: '내일 자',
  today: '오늘 자',
  allDay: '종일',
  date: '일자',
  time: '시간',
  event: '일정'
}

export const formats = {
  monthHeaderFormat: (date, culture, localizer) =>
    localizer.format(date, 'YYYY년 M월', culture),
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, 'M월 D일(ddd)', culture) +
    ' ~ ' +
    localizer.format(end, 'M월 D일(ddd)', culture),
  dayHeaderFormat: (date, culture, localizer) =>
    localizer.format(date, 'M월 D일(ddd)', culture),
  agendaHeaderFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, 'YYYY년 M월 D일(ddd)', culture) +
    ' ~ ' +
    localizer.format(end, 'YYYY년 M월 D일(ddd)', culture),
  dayFormat: (date, culture, localizer) =>
    localizer.format(date, 'M월 D일(ddd)', culture),
};

