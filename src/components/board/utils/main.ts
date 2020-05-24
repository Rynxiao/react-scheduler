import { DAY, DAY_HOURS, HOUR_MINUTES, MONTH, QUARTER, YEAR } from '@app/components/constants';
import { BoardCol, BoardConfig, ModeKey } from '@app/components/types';

let dayHeaders: BoardCol[];
let linesInCol: number;
let boardWidth: number;

export const isDayViewMode = (config: BoardConfig) => config.viewMode === DAY;
export const isMonthViewMode = (config: BoardConfig) => config.viewMode === MONTH;
export const getColWidth = (config: BoardConfig) => {
  if (isDayViewMode(config)) {
    return config.dayCellWidth;
  }
  return config.colWidth;
};

const getInterval = (hourInterval: number) => {
  let interval = hourInterval;
  if (interval < 0) {
    interval = 30;
  }
  if (interval > 60) {
    interval = 60;
  }
  return interval;
};

const getTimeFormat = (time: number) => (time >= 10 ? `${time}` : `0${time}`);

const generateDayHours = (lines: number, hourInterval: number) => {
  const hours = [];
  const counts = lines * DAY_HOURS;
  const middleHour = 12;

  for (let i = 0; i < counts; i++) {
    let title;
    let time;
    if (i % lines === 0) {
      const j = Math.floor(i / lines);
      if (j === 0) {
        title = '12:00 AM';
        time = '00:00';
      } else if (j < middleHour) {
        title = `${j}:00 AM`;
        time = `${getTimeFormat(j)}:00`;
      } else if (j === middleHour) {
        title = '12:00 PM';
        time = '12:00';
      } else {
        title = `${j - middleHour}:00 PM`;
        time = `${j}:00`;
      }
    } else {
      title = '';
      time = `${getTimeFormat(Math.floor(i / lines))}:${getTimeFormat((i % lines) * hourInterval)}`;
    }
    hours.push({ title, time });
  }
  return hours;
};

export const getLines = (config: BoardConfig) => {
  if (!linesInCol) {
    const interval = getInterval(config.hourInterval);
    return Math.floor(HOUR_MINUTES / interval);
  }
  return linesInCol;
};

export const getBoardWidth = (cols: BoardCol[]) => {
  if (!boardWidth) {
    return cols.reduce((width, col) => width + col.width, 0);
  }
  return boardWidth;
};

const generateDayHeaders = (config: BoardConfig) => {
  if (!dayHeaders) {
    const lines = getLines(config);
    const dayHours = generateDayHours(lines, config.hourInterval);
    dayHeaders = dayHours.map((dayHour, index) => ({
      title: dayHour.title,
      time: dayHour.time,
      key: `headerCol${index}`,
      width: config.dayCellWidth,
    }));
  }
  return dayHeaders;
};

const generateMonthHeaders = (config: BoardConfig) => {
  const cols: BoardCol[] = [];
  const month = config.date.format('MMM');
  const days = config.date.daysInMonth();
  for (let i = 1; i <= days; i++) {
    let title;
    if (i === 1) {
      title = `${month} ${i}`;
    } else {
      title = `${i}`;
    }
    const key = title;
    cols.push({ title, time: `${i}`, key, width: config.colWidth });
  }
  return cols;
};

const generateColHeaderByMode = (viewMode: ModeKey, config: BoardConfig) => {
  switch (viewMode) {
    case DAY:
      return generateDayHeaders(config);
    case MONTH:
      return generateMonthHeaders(config);
    case QUARTER:
    case YEAR:
    default:
      return generateDayHeaders(config);
  }
};

export const isWorkingHour = (config: BoardConfig, index: number, lines: number) => {
  const { workingHourStart, workingHourEnd } = config;
  if (isDayViewMode(config)) {
    const startIndex = lines * workingHourStart;
    const endIndex = lines * (workingHourEnd + 1);
    return index >= startIndex && index < endIndex;
  }
  return false;
};

export default generateColHeaderByMode;
