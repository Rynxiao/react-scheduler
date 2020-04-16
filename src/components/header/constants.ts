const VIEW_MODE = {
  DAY: 'Day',
  MONTH: 'Month',
  QUARTER: 'Quarter',
  YEAR: 'Year',
};

export default VIEW_MODE;
export type Mode = typeof VIEW_MODE;
export type ModeKey = keyof Mode;
