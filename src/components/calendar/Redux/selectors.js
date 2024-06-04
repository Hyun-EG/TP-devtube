// 리덕스 셀렉터

import { createSelector } from 'reselect';

const selectEventsState = (state) => state.events;

export const selectEvents = createSelector(
  [selectEventsState],
  (eventsState) => eventsState.items
);