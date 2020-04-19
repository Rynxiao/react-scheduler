import dayjs from 'dayjs';

const times = [
  dayjs().hour(5),
  dayjs().hour(7),
  dayjs().hour(9),
  dayjs().hour(11),
  dayjs().hour(12),
  dayjs().hour(13),
  dayjs().hour(18),
  dayjs().hour(21),
];

const eventList = [
  {
    id: 'e1',
    startDate: times[2],
    endDate: times[3],
    rId: 'r1',
  },
  {
    id: 'e2',
    startDate: times[4],
    endDate: times[6],
    rId: 'r1',
  },
  {
    id: 'e2',
    startDate: times[3],
    endDate: times[5],
    rId: 'r4',
  },
];

export default eventList;
