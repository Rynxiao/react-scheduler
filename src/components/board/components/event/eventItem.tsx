import ITEM_TYPES from '@app/components/board/components/event/constants';
import { getDayTime } from '@app/components/board/utils';
import { BoardEvent, PositionedItemTypes } from '@app/components/types';
import { Typography } from '@app/material/components';
import React from 'react';
import { useDrag } from 'react-dnd';
import useStyles from './index.styles';

interface EventItemProps {
  event: BoardEvent;
  style: PositionedItemTypes;
}

const EventItem: React.FC<EventItemProps> = ({ event, style }) => {
  const classes = useStyles();
  const [{ isDragging }, drag] = useDrag({
    item: { type: ITEM_TYPES.EVENT, id: event.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className={classes.eventItemWrapper}
      style={{ ...style, cursor: isDragging ? 'move' : 'default' }}
      ref={drag}
    >
      <div className={classes.eventItem}>
        {event.render ? event.render(event) : (
          <>
            <Typography variant="subtitle2">{event.title}</Typography>
            <Typography variant="caption">{`${getDayTime(event.startDate)}-${getDayTime(event.endDate)}`}</Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default EventItem;
