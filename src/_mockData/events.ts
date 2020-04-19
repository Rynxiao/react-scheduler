import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const times = [
  dayjs().hour(5).format(DATE_FORMAT),
  dayjs().hour(6).format(DATE_FORMAT),
  dayjs().hour(7).minute(0).format(DATE_FORMAT),
  dayjs().hour(7).minute(30).format(DATE_FORMAT),
  dayjs().hour(9).minute(0).format(DATE_FORMAT),
  dayjs().hour(9).minute(30).format(DATE_FORMAT),
  dayjs().hour(11).format(DATE_FORMAT),
  dayjs().hour(12).format(DATE_FORMAT),
  dayjs().hour(13).format(DATE_FORMAT),
  dayjs().hour(18).format(DATE_FORMAT),
  dayjs().hour(21).format(DATE_FORMAT),
];

const eventList = [
  {
    id: 'e1',
    title: 'event1',
    startDate: times[2],
    endDate: times[3],
    rId: 'r1',
  },
  {
    id: 'e2',
    title: 'event2',
    startDate: times[4],
    endDate: times[5],
    rId: 'r1',
  },
  {
    id: 'e3',
    title: 'event3',
    startDate: times[4],
    endDate: times[6],
    rId: 'r2',
  },
  {
    id: 'e4',
    title: 'event4',
    startDate: times[3],
    endDate: times[5],
    rId: 'r4',
  },
];

export default eventList;
