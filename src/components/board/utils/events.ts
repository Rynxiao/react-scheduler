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
import dayjs, { Dayjs, UnitType } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { getLines, isDayViewMode, isMonthViewMode } from './main';

dayjs.extend(isSameOrAfter);

export const getHours = (startDate: Dayjs, endDate: Dayjs) => {
  const hours = Number((endDate.diff(startDate, MINUTE_UNIT) / HOUR_MINUTES).toFixed(1));
  return hours > DAY_HOURS ? DAY_HOURS : hours;
};

export const getDayTime = (date: string) => dayjs(date).format(TIME_FORMAT);

export const getUnitWidth = (config: BoardConfig) => (
  isDayViewMode(config) ? config.dayCellWidth : config.colWidth
);

export const widthOfMinute = (config: BoardConfig) => {
  const lines = getLines(config);
  return (getUnitWidth(config) * lines) / HOUR_MINUTES;
};

export const minuteOfWidth = (config: BoardConfig) => 1 / widthOfMinute(config);

export const getTimeBy = (leftOffset: number, config: BoardConfig) => {
  const duration = leftOffset * minuteOfWidth(config);
  const hour = Math.floor(duration / HOUR_MINUTES);
  const min = Math.floor(duration % HOUR_MINUTES);
  return { hour, min };
};

export const getLeftOffset = (start: string | Dayjs, config: BoardConfig) => {
  const dayStart = dayjs(start);
  const duration = dayStart.hour() * HOUR_MINUTES + dayStart.minute();
  return duration * widthOfMinute(config);
};

export const setSpecificTime = (
  date: string | Dayjs,
  hour = 0,
  min = 0,
  second = 0,
) => dayjs(date).hour(hour).minute(min).second(second);

export const getEventCellStyle = (event: BoardEvent, config: BoardConfig) => {
  const { dayCellWidth, eventCellHeight, colWidth } = config;
  const lines = getLines(config);
  const start = dayjs(event.startDate);
  const end = dayjs(event.endDate);
  let width;
  let left = 0;
  if (isDayViewMode(config)) {
    const duration = getHours(start, end);
    width = duration * lines * dayCellWidth;
    left = getLeftOffset(start, config);
  } else if (isMonthViewMode(config)) {
    const startDay = start.date();
    const endDay = end.date();
    const daysInMonth = start.daysInMonth();
    let duration = endDay - startDay;
    duration = duration > daysInMonth ? daysInMonth : duration;
    width = (duration + 1) * colWidth;
  }
  return { width, height: eventCellHeight, left };
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

export const getEventTimeBy = (
  event: BoardEvent,
  width: number,
  left: number,
  config: BoardConfig,
) => {
  const { hour, min } = getTimeBy(left, config);
  const { hour: endHour, min: endMin } = getTimeBy(left + width, config);
  const { startDate } = event;

  return {
    startDate: setSpecificTime(startDate, hour, min).format(DATE_FORMAT),
    endDate: setSpecificTime(startDate, endHour, endMin).format(DATE_FORMAT),
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
  let startDate: dayjs.Dayjs;
  let endDate: dayjs.Dayjs;
  let unit: UnitType;

  if (isDayViewMode(config)) {
    startDate = getDateTimeBaseOnToday(col.time, date);
    endDate = nextCol !== null
      ? getDateTimeBaseOnToday(nextCol.time, date)
      : date.startOf(DAY_JS_UNIT_DAY).add(1, DAY_JS_UNIT_DAY);
    unit = DAY_JS_UNIT_MINUTE;
  } else {
    startDate = date.date(Number(col.time));
    endDate = nextCol !== null
      ? date.date(Number(nextCol.time))
      : date.startOf(DAY_JS_UNIT_DAY).add(1, DAY_JS_UNIT_DAY);
    unit = DAY_JS_UNIT_DAY;
  }

  return events.filter((event) => {
    const isEqual = dayjs(event.startDate).isSameOrAfter(startDate, unit)
      && endDate.isAfter(dayjs(event.startDate), unit);
    return event.rId === resource.id && isEqual;
  });
};
