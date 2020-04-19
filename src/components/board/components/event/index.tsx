import ITEM_TYPES from '@app/components/board/components/event/constants';
import { getDroppedOffset } from '@app/components/board/utils';
import { BoardConfig, BoardEvent } from '@app/components/types';
import React from 'react';
import { useDrop } from 'react-dnd';
import EventItem from './eventItem';
import useStyles, { generateEventBoardStyles } from './index.styles';

interface EventBoardProps {
  width: number;
  config: BoardConfig;
  events: BoardEvent[];
  bodyRef: React.MutableRefObject<HTMLDivElement>;
  onEventsChange(events: BoardEvent[]): void;
}

const EventBoard: React.FC<EventBoardProps> = ({
  width,
  events,
  config,
  bodyRef,
  onEventsChange,
}) => {
  const classes = useStyles();
  const [, drop] = useDrop({
    accept: ITEM_TYPES.EVENT,
    drop(item, monitor) {
      const clientOffset = monitor.getClientOffset();
      const itemInfo = monitor.getItem();
      const droppedOffset = getDroppedOffset(bodyRef, clientOffset, config);
      const newEvents = events.map((event) => {
        if (event.id === itemInfo.id) {
          return { ...event, left: droppedOffset.x, top: droppedOffset.y };
        }
        return event;
      });
      onEventsChange(newEvents);
    },
  });

  return (
    <div
      ref={drop}
      className={classes.eventBoard}
      style={generateEventBoardStyles(width, config)}
    >
      {events.map((event) => {
        const eventItemStyle = {
          width: `${event.width}px`,
          height: `${event.height}px`,
          left: `${event.left}px`,
          top: `${event.top}px`,
        };
        return (
          <EventItem
            key={event.id}
            event={event}
            style={eventItemStyle}
          />
        );
      })}
    </div>
  );
};

export default EventBoard;
