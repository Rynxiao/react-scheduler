import { DAY_HOURS, HOUR_MINUTES, MINUTE_UNIT, TIME_FORMAT } from '@app/components/constants';
import { BoardConfig, BoardEvent, Resource } from '@app/components/types';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
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

export const getRelativeOffset = (
  bodyRef: React.MutableRefObject<HTMLDivElement>,
  clientOffset: XYCoord,
  config: BoardConfig,
) => {
  const bodyEle = bodyRef.current;
  const { scrollLeft, scrollTop } = bodyEle;
  const bodyClientOffset = bodyEle.getBoundingClientRect();
  const clientX = clientOffset.x;
  const clientY = clientOffset.y;
  const bodyClientX = bodyClientOffset.x;
  const bodyClientY = bodyClientOffset.y;
  let x = clientX - bodyClientX + scrollLeft;
  if (!config.hiddenResourceCol) {
    x -= config.resourceColWidth;
  }
  const y = clientY - bodyClientY + scrollTop;
  return { x, y };
};

export const getDroppedOffset = (
  bodyRef: React.MutableRefObject<HTMLDivElement>,
  clientOffset: XYCoord,
  config: BoardConfig,
) => {
  const { dayCellWidth, rowHeight } = config;
  const offset = getRelativeOffset(bodyRef, clientOffset, config);
  const left = Math.floor(offset.x / dayCellWidth) * dayCellWidth;
  const top = Math.floor(offset.y / rowHeight) * rowHeight;
  return { x: left, y: top };
};
