import { UnitType } from 'dayjs';

export const DAY = 'DAY';
export const MONTH = 'MONTH';
export const QUARTER = 'QUARTER';
export const YEAR = 'YEAR';

const VIEW_MODE = {
  DAY: 'Day',
  MONTH: 'Month',
  QUARTER: 'Quarter',
  YEAR: 'Year',
};

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm';
export const DAY_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm';

export const HOUR_MINUTES = 60;
export const DAY_HOURS = 24;
export const MINUTE_UNIT = 'minute';

export const DAY_JS_UNIT_YEAR: UnitType = 'year';
export const DAY_JS_UNIT_MONTH: UnitType = 'month';
export const DAY_JS_UNIT_DAY: UnitType = 'day';
export const DAY_JS_UNIT_HOUR: UnitType = 'hour';
export const DAY_JS_UNIT_MINUTE: UnitType = 'minute';
export const DAY_JS_UNIT_SECOND: UnitType = 'second';

export default VIEW_MODE;
