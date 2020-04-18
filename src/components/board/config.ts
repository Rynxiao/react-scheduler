import { DAY } from '@app/components/constants';
import { ModeKey } from '@app/components/types';
import dayjs from 'dayjs';

const boardConfig = {
  viewMode: DAY as ModeKey,
  date: dayjs(),
  colWidth: 100,
  rowHeight: 68,

  resourceTitle: 'Resources',
  resourceColWidth: 150,
  hiddenResourceCol: false,

  dayStartFrom: 9,
  hourInterval: 30,
  dayCellWidth: 50,
};

export default boardConfig;
