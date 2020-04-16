import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { DatePicker } from '@material-ui/pickers';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import Today from '@material-ui/icons/Today';
import dayjs, { Dayjs } from 'dayjs';
import useHeaderStyles from './index.styles';

interface Props {
  onCollapse(): void;
}

const Header: React.FC<Props> = ({ onCollapse }) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());
  const [open, setOpen] = React.useState(false);
  const classes = useHeaderStyles();

  const handleSelectToday = () => setSelectedDate(dayjs());
  const handleOpenDatePicker = () => setOpen(true);
  const handleCloseDatePicker = () => setOpen(false);

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date);
    handleCloseDatePicker();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onCollapse}>
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6">Scheduler Board</Typography>
        <Typography variant="h6">{selectedDate.format('YYYY/MM/DD')}</Typography>
        <Button variant="outlined" color="primary" className={classes.today} onClick={handleSelectToday}>Today</Button>
        <IconButton edge="start" color="inherit" aria-label="navigate_before">
          <NavigateBefore />
        </IconButton>
        <IconButton edge="start" color="inherit" aria-label="navigate_next">
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
