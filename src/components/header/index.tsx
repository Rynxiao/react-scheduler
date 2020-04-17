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
import PropTypes from 'prop-types';
import React from 'react';
import VIEW_MODE, { ModeKey } from './constants';
import useHeaderStyles from './index.styles';

interface Props {
  onCollapse(): void;
}

const Header: React.FC<Props> = ({ onCollapse }) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState(VIEW_MODE.DAY);
  const classes = useHeaderStyles();

  const handleSelectToday = () => setSelectedDate(dayjs());
  const handleOpenDatePicker = () => setOpen(true);
  const handleCloseDatePicker = () => setOpen(false);
  const handleSelectPrevious = () => setSelectedDate(selectedDate.add(-1, 'day'));
  const handleSelectNext = () => setSelectedDate(selectedDate.add(1, 'day'));

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date);
    handleCloseDatePicker();
  };

  const handleModeChange = (event: React.ChangeEvent<{ value: string }>) => (
    setMode(event.target.value)
  );

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
              <MenuItem key={key} value={VIEW_MODE[key]}>{VIEW_MODE[key]}</MenuItem>
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

Header.propTypes = {
  onCollapse: PropTypes.func.isRequired,
};

export default Header;
