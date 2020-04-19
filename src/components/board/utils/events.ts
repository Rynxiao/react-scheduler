import { DAY_HOURS, HOUR_MINUTES, MINUTE_UNIT, TIME_FORMAT } from '@app/components/constants';
import { BoardConfig, BoardEvent, Resource } from '@app/components/types';
import dayjs, { Dayjs } from 'dayjs';
import { XYCoord } from 'react-dnd';
import { isDayViewMode, isMonthViewMode } from './main';

export const getHours = (startDate: Dayjs, endDate: Dayjs) => {
  const hours = Number((endDate.diff(startDate, MINUTE_UNIT) / HOUR_MINUTES).toFixed(1));
  return hours > DAY_HOURS ? DAY_HOURS : hours;
};

export const getDayTime = (date: string) => dayjs(date).format(TIME_FORMAT);

export const getEventItemStyleProps = (
  event: BoardEvent,
  lines: number,
  config: BoardConfig,
  resources: Resource[],
) => {
  const { dayCellWidth, rowHeight, hiddenResourceCol, resourceColWidth, colWidth } = config;
  const resourceIndex = resources.findIndex((resource) => resource.id === event.rId);
  const top = resourceIndex * (rowHeight + 1);
  const start = dayjs(event.startDate);
  const end = dayjs(event.endDate);
  let left;
  let width;
  if (isDayViewMode(config)) {
    const duration = getHours(start, end);
    left = start.hour() * lines * dayCellWidth;
    width = duration * lines * dayCellWidth;
    if (!hiddenResourceCol) {
      left = resourceColWidth + left;
    }
  } else if (isMonthViewMode(config)) {
    const startDay = start.day();
    const endDay = end.day();
    const daysInMonth = start.daysInMonth();
    let duration = startDay - endDay;
    duration = duration > daysInMonth ? daysInMonth : duration;
    left = startDay * colWidth;
    width = (duration + 1) * colWidth;
    if (!hiddenResourceCol) {
      left = resourceColWidth + left;
    }
  }
  return { left, top, width, height: rowHeight };
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

export const getDroppedOffset = (offset: XYCoord, config: BoardConfig, event: BoardEvent) => {
  const { dayCellWidth, rowHeight, colWidth } = config;
  let offsetX = offset.x + Number(event.left);
  let offsetY = offset.y + Number(event.top);
  offsetX = offsetX > 0 ? offsetX : 0;
  offsetY = offsetY > 0 ? offsetY : 0;

  let x = offsetX;
  const y = Math.floor(offsetY / rowHeight) * (rowHeight + 1);

  if (isMonthViewMode(config)) {
    x = Math.floor(offsetX / colWidth) * colWidth;
  } else if (isDayViewMode(config)) {
    x = Math.floor(offsetX / dayCellWidth) * dayCellWidth;
  }
  return { x, y };
};
