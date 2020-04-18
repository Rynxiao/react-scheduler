import {
  DAY, MONTH, QUARTER, YEAR,
} from '@app/components/constants';
import { BoardCol, BoardConfig, ModeKey } from '@app/components/types';

const HOUR_MINUTES = 60;
const DAY_HOURS = 24;
let dayHeaders: BoardCol[];

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

const generateDayHours = (lines: number) => {
  const hours: string[] = [];
  const counts = lines * DAY_HOURS;
  const middleHour = 12;

  for (let i = 0; i < counts; i++) {
    let title;
    if (i % 2 === 0) {
      const j = Math.floor(i / 2);
      if (j === 0) {
        title = '12:00 AM';
      } else if (j < middleHour) {
        title = `${j}:00 AM`;
      } else if (j === middleHour) {
        title = '12:00 PM';
      } else {
        title = `${j - middleHour}:00 PM`;
      }
    } else {
      title = '';
    }
    hours.push(title);
  }
  return hours;
};

const generateDayHeaders = (config: BoardConfig) => {
  if (!dayHeaders) {
    const interval = getInterval(config.hourInterval);
    const lines = Math.floor(HOUR_MINUTES / interval);
    const dayHourTitles = generateDayHours(lines);
    dayHeaders = dayHourTitles.map((dayHourTitle, index) => ({
      title: dayHourTitle,
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
    cols.push({ title, key, width: config.colWidth });
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

export default generateColHeaderByMode;
