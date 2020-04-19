import EventDropCell from '@app/components/board/components/event/eventDropCell';
import { getEventItem } from '@app/components/board/utils';
import { BoardCol, BoardConfig, BoardEvent, Resource } from '@app/components/types';
import React from 'react';
import useStyles, { generateEventBoardStyles } from './index.styles';

interface EventBoardProps {
  width: number;
  cols: BoardCol[];
  resourceList: Resource[];
  config: BoardConfig;
  events: BoardEvent[];
  onEventsChange(events: BoardEvent[]): void;
}

const EventBoard: React.FC<EventBoardProps> = ({
  width,
  cols,
  resourceList,
  events,
  config,
}) => {
  const classes = useStyles();
  return (
    <div
      className={classes.eventBoard}
      style={generateEventBoardStyles(width, config)}
    >
      {resourceList.map((resource) => (
        <div key={`event${resource.id}`} style={{ height: `${config.rowHeight + 1}px` }}>
          {
            cols.map((col) => {
              const cellEvents = getEventItem(col, resource, events, config);
              return <EventDropCell key={`event${col.key}`} col={col} config={config} cellEvents={cellEvents} />;
            })
          }
        </div>
      ))}
    </div>
  );
};

export default EventBoard;
