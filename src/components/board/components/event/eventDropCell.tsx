import ITEM_TYPES from '@app/components/board/components/event/constants';
import EventItem from '@app/components/board/components/event/eventItem';
import { getEventCellTimes, isDayViewMode } from '@app/components/board/utils';
import {
  BoardCol,
  BoardConfig,
  BoardEvent,
  DragEventCollectedProps,
  DragEventObject, EventDroppedObject,
  Resource,
} from '@app/components/types';
import classNames from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import useStyles from './index.styles';

interface EventDropCellProps {
  col: BoardCol;
  resource: Resource;
  config: BoardConfig;
  cellEvents: BoardEvent[];
  onEventDropped(eventDroppedObject: EventDroppedObject): void;
}

const EventDropCell: React.FC<EventDropCellProps> = ({
  col,
  resource,
  config,
  cellEvents,
  onEventDropped,
}) => {
  let droppedEle: HTMLDivElement;
  const classes = useStyles();
  const colWidth = isDayViewMode(config) ? config.dayCellWidth : config.colWidth;
  const [{ isOver }, drop] = useDrop<DragEventObject, void, DragEventCollectedProps>({
    accept: ITEM_TYPES.EVENT,
    drop(item) {
      const { width } = item;
      const time = droppedEle.getAttribute('data-col-start');
      const rId = droppedEle.getAttribute('data-resource-id');
      const { startDate, endDate } = getEventCellTimes(width, time, config);
      onEventDropped({ rId, startDate, endDate, originalEvent: item.event });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(element) => {
        droppedEle = element;
        return drop(element);
      }}
      key={`event${col.key}`}
      className={classNames(classes.eventCell, { [classes.hovered]: isOver })}
      style={{ width: `${colWidth}px`, height: `${config.rowHeight}px` }}
      data-resource-id={resource.id}
      data-col-start={col.time}
    >
      {cellEvents.map((cellEvent) => (
        <EventItem key={`cellEvent${cellEvent.id}`} event={cellEvent} config={config} />
      ))}
    </div>
  );
};

export default EventDropCell;
