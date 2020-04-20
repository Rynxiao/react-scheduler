import { DATE_FORMAT, DAY_FORMAT, DAY_HOURS, HOUR_MINUTES, MINUTE_UNIT, TIME_FORMAT } from '@app/components/constants';
import { BoardCol, BoardConfig, BoardEvent, Resource } from '@app/components/types';
import dayjs, { Dayjs } from 'dayjs';
import { getLines, isDayViewMode, isMonthViewMode } from './main';

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

const fixStartEventMinute = (date: string) => {
  let fixedMinute;
  const initialDate = dayjs(date);
  const minutes = initialDate.minute();
  if (minutes >= 0 && minutes < 30) {
    fixedMinute = 0;
  } else if (minutes >= 30) {
    fixedMinute = 30;
  }
  return initialDate.minute(fixedMinute);
};

export const getEventItem = (
  col: BoardCol,
  resource: Resource,
  events: BoardEvent[],
  config: BoardConfig,
) => (
  events.filter((event) => {
    const dayFormat = config.date.format(DAY_FORMAT);
    const unit = isDayViewMode(config) ? 'minute' : 'month';
    const isEqual = fixStartEventMinute(event.startDate).isSame(`${dayFormat} ${col.time}`, unit);
    return event.rId === resource.id && isEqual;
  })
);

export const getEventCellTimes = (width: number, time: string, config: BoardConfig) => {
  let startDate;
  let endDate;
  const { date, dayCellWidth } = config;
  const lines = getLines(config);
  const counts = width / dayCellWidth;
  const lineMinute = HOUR_MINUTES / lines;
  const hour = time.split(':')[0];
  const min = time.split(':')[1];
  if (isDayViewMode(config)) {
    startDate = date.hour(Number(hour)).minute(Number(min)).second(0);
    endDate = startDate.add(counts * lineMinute, 'minute');
  } else if (isMonthViewMode(config)) {
    startDate = date.day(Number(time));
    endDate = startDate.add(counts, 'day');
  }
  return {
    startDate: startDate.format(DATE_FORMAT),
    endDate: endDate.format(DATE_FORMAT),
  };
};
