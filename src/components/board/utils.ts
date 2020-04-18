import {
  DAY, MONTH, QUARTER, YEAR,
} from '@app/components/constants';
import { BoardCol, BoardConfig, ModeKey } from '@app/components/types';

const DAY_HOURS = 24;
let dayHourTitles: string[];

const generateDayHours = () => {
  const hours: string[] = [];
  for (let i = 0; i < DAY_HOURS; i++) {
    let title;
    if (i === 0) {
      title = '12:00 AM';
    } else if (i < 12) {
      title = `${i}:00 AM`;
    } else if (i === 12) {
      title = '12:00 PM';
    } else {
      title = `${i - 12}:00 PM`;
    }
    hours.push(title);
  }
  return hours;
};

const generateDayHeaders = (config: BoardConfig) => {
  if (!dayHourTitles) {
    dayHourTitles = generateDayHours();
  }
  return dayHourTitles.map((dayHourTitle) => ({
    title: dayHourTitle,
    key: dayHourTitle,
    width: config.colWidth,
  }));
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
