import { getEventStyles } from '@app/components/board/utils';
import { BoardConfig, BoardEvent, Resource } from '@app/components/types';
import { Box } from '@app/material/components';
import React from 'react';
import EventItem from './eventItem';
import useStyles from './index.styles';

interface EventBoardProps {
  config: BoardConfig;
  resourceList: Resource[];
  lines: number;
  events: BoardEvent[];
}

const EventBoard: React.FC<EventBoardProps> = ({
  events,
  lines,
  resourceList,
  config,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.eventBoard}>
      {events.map((event) => (
        <Box
          className={classes.eventItemWrapper}
          style={getEventStyles(event, lines, config, resourceList)}
          key={event.id}
        >
          {event.render ? event.render(event) : <EventItem event={event} />}
        </Box>
      ))}
    </div>
  );
};

export default EventBoard;
