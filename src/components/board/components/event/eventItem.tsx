import ITEM_TYPES from '@app/components/board/components/event/constants';
import { calculateEventCellStyleByDuration, getDayTime } from '@app/components/board/utils';
import { BoardConfig, BoardEvent } from '@app/components/types';
import { Typography } from '@app/material/components';
import React from 'react';
import { useDrag } from 'react-dnd';
import useStyles from './index.styles';

interface EventItemProps {
  event: BoardEvent;
  config: BoardConfig;
}

const EventItem: React.FC<EventItemProps> = ({ event, config }) => {
  const classes = useStyles();
  const [{ isDragging }, drag] = useDrag({
    item: { type: ITEM_TYPES.EVENT, event },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const style = calculateEventCellStyleByDuration(event, config);

  return (
    <div
      className={classes.eventItemWrapper}
      style={{
        width: `${style.width}px`,
        height: `${style.height}px`,
        cursor: isDragging ? 'move' : 'default',
      }}
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
