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
import classNames from 'classnames';
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
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={classNames(classes.eventRow, { [classes.hovered]: isOver })}
      style={{ height: `${config.rowHeight + 1}px` }}
    >
      {cellEvents.map((cellEvent) => (
        <EventItem key={`cellEvent${cellEvent.id}`} event={cellEvent} config={config} />
      ))}
    </div>
  );
};

export default EventDropRow;
