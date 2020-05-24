import ITEM_TYPES from '@app/components/board/components/event/constants';
import { calculateEventCellStyleByDuration, getDayTime } from '@app/components/board/utils';
import { BoardConfig, BoardEvent } from '@app/components/types';
import { Popover, Typography } from '@app/material/components';
import React from 'react';
import { useDrag } from 'react-dnd';
import useStyles from './index.styles';

interface EventItemProps {
  event: BoardEvent;
  config: BoardConfig;
}

const EventItem: React.FC<EventItemProps> = ({ event, config }) => {
  const classes = useStyles();
  const style = calculateEventCellStyleByDuration(event, config);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ITEM_TYPES.EVENT, event, width: style.width },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleClick = (popoverEvent: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(popoverEvent.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'eventPopover' : undefined;

  return (
    <>
      <div
        onClick={handleClick}
        role="presentation"
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
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>
    </>
  );
};

export default EventItem;
