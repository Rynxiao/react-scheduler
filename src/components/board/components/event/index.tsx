import EventDropCell from '@app/components/board/components/event/eventDropCell';
import { getEventItem } from '@app/components/board/utils';
import {
  BoardCol,
  BoardConfig,
  BoardEvent,
  EventDroppedObject,
  Resource,
} from '@app/components/types';
import React from 'react';
import useStyles, { generateEventBoardStyles } from './index.styles';

interface EventBoardProps {
  width: number;
  cols: BoardCol[];
  resourceList: Resource[];
  config: BoardConfig;
  events: BoardEvent[];
  onEventsChange(events: BoardEvent[]): void;
  onDropped?(eventDroppedObject: EventDroppedObject): void;
}

const EventBoard: React.FC<EventBoardProps> = ({
  width,
  cols,
  resourceList,
  events,
  config,
  onEventsChange,
  onDropped,
}) => {
  const classes = useStyles();

  const handleEventDropped = (eventDroppedObject: EventDroppedObject) => {
    const newEvents = events.map((event) => {
      const { rId, startDate, endDate } = eventDroppedObject;
      if (event.rId === eventDroppedObject.originalEvent.rId && event.id === eventDroppedObject.originalEvent.id) {
        return { ...event, rId, startDate, endDate };
      }
      return event;
    });
    onEventsChange(newEvents);
    if (onDropped) {
      onDropped(eventDroppedObject);
    }
  };

  return (
    <div
      className={classes.eventBoard}
      style={generateEventBoardStyles(width, config)}
    >
      {resourceList.map((resource) => (
        <div key={`event${resource.id}`} style={{ height: `${config.rowHeight + 1}px` }}>
          {
            cols.map((col, index) => {
              const nextCol = index < cols.length - 1 ? cols[index + 1] : null;
              const cellEvents = getEventItem(col, nextCol, resource, events, config);
              return (
                <EventDropCell
                  key={`event${col.key}`}
                  col={col}
                  resource={resource}
                  config={config}
                  cellEvents={cellEvents}
                  onEventDropped={handleEventDropped}
                />
              );
            })
          }
        </div>
      ))}
    </div>
  );
};

export default EventBoard;
