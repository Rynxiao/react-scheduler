import { getDayTime, getEventStyles } from '@app/components/board/utils';
import { BoardConfig, BoardEvent, Resource } from '@app/components/types';
import { Box, Typography } from '@app/material/components';
import React from 'react';
import useStyles from '../../index.styles';

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
      { events.map((event) => (
        <Box
          className={classes.eventItemWrapper}
          style={getEventStyles(event, lines, config, resourceList)}
          key={event.id}
        >
          {
            event.render ? event.render(event) : (
              <div className={classes.eventItem}>
                <Typography variant="subtitle2">{event.title}</Typography>
                <Typography variant="caption">{`${getDayTime(event.startDate)}-${getDayTime(event.endDate)}`}</Typography>
              </div>
            )
          }
        </Box>
      )) }
    </div>
  );
};

export default EventBoard;
