import { HOUR_MINUTES, MINUTE_UNIT, TIME_FORMAT } from '@app/components/constants';
import { BoardConfig, BoardEvent, Resource } from '@app/components/types';
import dayjs, { Dayjs } from 'dayjs';
import { isDayViewMode, isMonthViewMode } from './main';

export const getHours = (startDate: Dayjs, endDate: Dayjs) => (
  Number((endDate.diff(startDate, MINUTE_UNIT) / HOUR_MINUTES).toFixed(1))
);

export const getDayTime = (date: string) => dayjs(date).format(TIME_FORMAT);

export const getEventStyles = (
  event: BoardEvent,
  lines: number,
  config: BoardConfig,
  resources: Resource[],
) => {
  const { dayCellWidth, rowHeight, hiddenResourceCol, resourceColWidth, colWidth } = config;
  const resourceIndex = resources.findIndex((resource) => resource.id === event.rId);
  const top = resourceIndex * (rowHeight + 1);
  let left;
  let width;
  if (isDayViewMode(config)) {
    const start = dayjs(event.startDate);
    const end = dayjs(event.endDate);
    const duration = getHours(start, end);
    left = start.hour() * lines * dayCellWidth;
    width = duration * lines * dayCellWidth;
    if (!hiddenResourceCol) {
      left = resourceColWidth + left;
    }
  } else if (isMonthViewMode(config)) {
    const startDay = dayjs(event.startDate).day();
    const endDay = dayjs(event.endDate).day();
    left = startDay * colWidth;
    width = (startDay - endDay) * colWidth;
    if (!hiddenResourceCol) {
      left = resourceColWidth + left;
    }
  }
  return { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${rowHeight}px` };
};
