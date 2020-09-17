import EventDropRow from '@app/components/board/components/event/eventDropRow';
import {
  BoardConfig,
  BoardEvent,
  EventDroppedObject,
  Resource,
} from '@app/components/types';
import React from 'react';
import useStyles, { generateEventBoardStyles } from './index.styles';

interface EventBoardProps {
  width: number;
  resourceList: Resource[];
  config: BoardConfig;
  events: BoardEvent[];
  onEventDropped(eventDroppedObject: EventDroppedObject): void;
}

const EventBoard: React.FC<EventBoardProps> = ({
  width,
  resourceList,
  events,
  config,
  onEventDropped,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.eventBoard}
      style={generateEventBoardStyles(width, config)}
    >
      {resourceList.map((resource) => {
        const cellEvents = events.filter((event) => event.rId === resource.id);
        return (
          <EventDropRow
            key={`eventDropRow${resource.id}`}
            resource={resource}
            config={config}
            cellEvents={cellEvents}
            onEventDropped={onEventDropped}
          />
        );
      })}
    </div>
  );
};

export default EventBoard;
