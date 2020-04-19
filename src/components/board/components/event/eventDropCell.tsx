import ITEM_TYPES from '@app/components/board/components/event/constants';
import EventItem from '@app/components/board/components/event/eventItem';
import { isDayViewMode } from '@app/components/board/utils';
import { BoardCol, BoardConfig, BoardEvent } from '@app/components/types';
import classNames from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import useStyles from './index.styles';

interface EventDropCellProps {
  col: BoardCol;
  config: BoardConfig;
  cellEvents: BoardEvent[];
}

const EventDropCell: React.FC<EventDropCellProps> = ({
  col,
  config,
  cellEvents,
}) => {
  const classes = useStyles();
  const colWidth = isDayViewMode(config) ? config.dayCellWidth : config.colWidth;
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPES.EVENT,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      key={`event${col.key}`}
      className={classNames(classes.eventCell, { [classes.hovered]: isOver })}
      style={{ width: `${colWidth}px`, height: `${config.rowHeight}px` }}
    >
      {cellEvents.map((cellEvent) => (
        <EventItem key={`cellEvent${cellEvent.id}`} event={cellEvent} config={config} />
      ))}
    </div>
  );
};

export default EventDropCell;
