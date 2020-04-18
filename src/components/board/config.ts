import VIEW_MODE from '@app/components/constants';
import dayjs from 'dayjs';

const config = {
  viewMode: VIEW_MODE.DAY,
  date: dayjs(),
  colWidth: 100,

  resourceTitle: 'Resources',
  resourceColWidth: 150,
  hiddenResourceCol: false,

  dayStartFrom: 9,
  hourInterval: 30,
};

export default config;
