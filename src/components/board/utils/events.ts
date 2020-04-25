import {
  DATE_FORMAT,
  DAY_HOURS,
  DAY_JS_UNIT_DAY,
  DAY_JS_UNIT_MINUTE,
  HOUR_MINUTES,
  MINUTE_UNIT,
  TIME_FORMAT,
} from '@app/components/constants';
import { BoardCol, BoardConfig, BoardEvent, Resource } from '@app/components/types';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { getLines, isDayViewMode, isMonthViewMode } from './main';

dayjs.extend(isSameOrAfter);

export const getHours = (startDate: Dayjs, endDate: Dayjs) => {
  const hours = Number((endDate.diff(startDate, MINUTE_UNIT) / HOUR_MINUTES).toFixed(1));
  return hours > DAY_HOURS ? DAY_HOURS : hours;
};

export const getDayTime = (date: string) => dayjs(date).format(TIME_FORMAT);

export const calculateEventCellStyleByDuration = (event: BoardEvent, config: BoardConfig) => {
  const { dayCellWidth, eventCellHeight, colWidth } = config;
  const lines = getLines(config);
  const start = dayjs(event.startDate);
  const end = dayjs(event.endDate);
  let width;
  if (isDayViewMode(config)) {
    const duration = getHours(start, end);
    width = duration * lines * dayCellWidth;
  } else if (isMonthViewMode(config)) {
    const startDay = start.day();
    const endDay = end.day();
    const daysInMonth = start.daysInMonth();
    let duration = startDay - endDay;
    duration = duration > daysInMonth ? daysInMonth : duration;
    width = (duration + 1) * colWidth;
  }
  return { width, height: eventCellHeight };
};

export const getMatchedEvents = (events: BoardEvent[], config: BoardConfig) => {
  if (isDayViewMode(config)) {
    return events.filter((event) => dayjs(event.startDate).day() === config.date.day());
  }
  if (isMonthViewMode(config)) {
    return events.filter((event) => dayjs(event.startDate).month() === config.date.month());
  }
  return [];
};

export const getDateTimeBaseOnToday = (time: string, date: Dayjs) => {
  const hour = time.split(':')[0];
  const min = time.split(':')[1];
  return date.hour(Number(hour)).minute(Number(min)).second(0);
};

export const getEventCellTimes = (width: number, time: string, config: BoardConfig) => {
  let startDate;
  let endDate;
  const { date, dayCellWidth } = config;
  const lines = getLines(config);
  const counts = width / dayCellWidth;
  const lineMinute = HOUR_MINUTES / lines;
  if (isDayViewMode(config)) {
    startDate = getDateTimeBaseOnToday(time, date);
    endDate = startDate.add(counts * lineMinute, DAY_JS_UNIT_MINUTE);
  } else if (isMonthViewMode(config)) {
    startDate = date.day(Number(time));
    endDate = startDate.add(counts, DAY_JS_UNIT_DAY);
  }
  return {
    startDate: startDate.format(DATE_FORMAT),
    endDate: endDate.format(DATE_FORMAT),
  };
};

export const getEventItem = (
  col: BoardCol,
  nextCol: BoardCol,
  resource: Resource,
  events: BoardEvent[],
  config: BoardConfig,
) => {
  const { date } = config;
  const startDate = getDateTimeBaseOnToday(col.time, date);
  const endDate = nextCol !== null
    ? getDateTimeBaseOnToday(nextCol.time, date)
    : date.startOf(DAY_JS_UNIT_DAY).add(1, DAY_JS_UNIT_DAY);
  return events.filter((event) => {
    const isEqual = dayjs(event.startDate).isSameOrAfter(startDate, DAY_JS_UNIT_MINUTE)
      && endDate.isAfter(dayjs(event.startDate), DAY_JS_UNIT_MINUTE);
    return event.rId === resource.id && isEqual;
  });
};
