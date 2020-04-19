import { getDayTime } from '@app/components/board/utils';
import { BoardEvent } from '@app/components/types';
import { Typography } from '@app/material/components';
import React from 'react';
import useStyles from './index.styles';

interface EventItemProps {
  event: BoardEvent;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const classes = useStyles();
  return (
    <div className={classes.eventItem}>
      <Typography variant="subtitle2">{event.title}</Typography>
      <Typography variant="caption">{`${getDayTime(event.startDate)}-${getDayTime(event.endDate)}`}</Typography>
    </div>
  );
};

export default EventItem;
