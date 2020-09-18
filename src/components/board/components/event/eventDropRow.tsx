import ITEM_TYPES from '@app/components/board/components/event/constants';
import EventItem from '@app/components/board/components/event/eventItem';
import { getEventTimeBy, getLeftOffset } from '@app/components/board/utils';
import {
  BoardConfig,
  BoardEvent,
  DragEventCollectedProps,
  DragEventObject,
  EventDroppedObject,
  Resource,
} from '@app/components/types';
import React from 'react';
import { useDrop } from 'react-dnd';
import useStyles from './index.styles';

interface EventDropCellProps {
  resource: Resource;
  config: BoardConfig;
  cellEvents: BoardEvent[];
  onEventDropped(eventDroppedObject: EventDroppedObject): void;
}

const EventDropRow: React.FC<EventDropCellProps> = ({
  resource,
  config,
  cellEvents,
  onEventDropped,
}) => {
  const classes = useStyles();
  const [hoverStyle, setHoverStyle] = React.useState({});
  const [{ isOver }, drop] = useDrop<DragEventObject, void, DragEventCollectedProps>({
    accept: ITEM_TYPES.EVENT,
    drop(item, monitor) {
      const { id } = resource;
      const { width } = item;
      const offset = monitor.getDifferenceFromInitialOffset();
      const itemLeft = getLeftOffset(item.event.startDate, config) + offset.x;
      const { startDate, endDate } = getEventTimeBy(item.event, width, itemLeft, config);
      onEventDropped({
        current: { rId: id, startDate, endDate },
        original: item.event,
      });
      return offset;
    },
    hover(item, monitor) {
      const { width, event } = item;
      const offset = monitor.getDifferenceFromInitialOffset();
      const itemLeft = getLeftOffset(event.startDate, config) + offset.x;
      setHoverStyle({ ...hoverStyle, left: `${itemLeft}px`, width: `${width}px` });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const height = config.rowHeight + 1;

  return (
    <div
      ref={drop}
      className={classes.eventRow}
      style={{ height: `${height}px` }}
    >
      {isOver && (
        <div
          className={classes.eventRowHover}
          style={{ ...hoverStyle, height: `${height}px` }}
        />
      )}
      {cellEvents.map((cellEvent) => (
        <EventItem key={`cellEvent${cellEvent.id}`} event={cellEvent} config={config} />
      ))}
    </div>
  );
};

export default EventDropRow;
