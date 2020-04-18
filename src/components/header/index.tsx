import { ModeKey } from '@app/components/types';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@app/material/components';
import {
  MenuIcon,
  NavigateBefore,
  NavigateNext,
  Today,
} from '@app/material/icons';
import { DatePicker } from '@app/material/pickers';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import VIEW_MODE from '../constants';
import useHeaderStyles from './index.styles';

interface Props {
  mode: ModeKey;
  onCollapse(): void;
  onModeChange(mode: ModeKey): void;
  selectedDate: Dayjs;
  onSelectDate(date: Dayjs): void;
}

const Header: React.FC<Props> = ({
  mode,
  onCollapse,
  onModeChange,
  selectedDate,
  onSelectDate,
}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useHeaderStyles();

  const handleSelectToday = () => onSelectDate(dayjs());
  const handleOpenDatePicker = () => setOpen(true);
  const handleCloseDatePicker = () => setOpen(false);
  const handleSelectPrevious = () => onSelectDate(selectedDate.add(-1, 'day'));
  const handleSelectNext = () => onSelectDate(selectedDate.add(1, 'day'));

  const handleDateChange = (date: Dayjs) => {
    onSelectDate(date);
    handleCloseDatePicker();
  };

  const handleModeChange = (event: React.ChangeEvent<{ value: ModeKey }>) => {
    const viewMode = event.target.value;
    onModeChange(viewMode);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onCollapse}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Scheduler Board</Typography>
        <Select
          value={mode}
          onChange={handleModeChange}
          classes={{ root: classes.select, icon: classes.icon }}
          className={classes.modeSelect}
          labelWidth={300}
        >
          {
            Object.keys(VIEW_MODE).map((key: ModeKey) => (
              <MenuItem key={key} value={key}>{VIEW_MODE[key]}</MenuItem>
            ))
          }
        </Select>
        <Box className={classes.title} />
        <Typography variant="h6">{selectedDate.format('YYYY/MM/DD')}</Typography>
        <Button variant="text" color="primary" className={classes.today} onClick={handleSelectToday}>Today</Button>
        <IconButton edge="start" color="inherit" aria-label="navigate_before" onClick={handleSelectPrevious}>
          <NavigateBefore />
        </IconButton>
        <IconButton edge="start" color="inherit" aria-label="navigate_next" onClick={handleSelectNext}>
          <NavigateNext />
        </IconButton>
        <IconButton edge="start" color="inherit" aria-label="today" onClick={handleOpenDatePicker}>
          <Today />
        </IconButton>
        <DatePicker
          className={classes.datePicker}
          autoOk
          open={open}
          variant="inline"
          value={selectedDate}
          onChange={handleDateChange}
          animateYearScrolling
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
