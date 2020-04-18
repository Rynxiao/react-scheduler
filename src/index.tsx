import generateResourceList from '@app/_mockData/resource';
import SchedulerBoard from '@app/components/board';
import config from '@app/components/board/config';
import generateColHeaderByMode from '@app/components/board/utils';
import { DAY, MONTH } from '@app/components/constants';
import { BoardCol, ModeKey } from '@app/components/types';
import { MuiPickersUtilsProvider } from '@app/material/pickers';
import { ThemeProvider } from '@app/material/styles';
import { appTheme } from '@app/utils';
import DayjsUtils from '@date-io/dayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import Header from './components/header';
import useIndexStyles, { sidebarStyles } from './index.styles';

export default () => {
  const [hasSidebar, setSidebar] = useState(true);
  const [mode, setMode] = React.useState<ModeKey>(DAY);
  const [cols, setCols] = React.useState<BoardCol[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());
  const classes = useIndexStyles(sidebarStyles(hasSidebar, appTheme));

  useEffect(() => {
    setCols(generateColHeaderByMode(mode, config));
  }, []);

  const handleModeChange = (viewMode: ModeKey) => {
    setMode(viewMode);
    setCols(generateColHeaderByMode(viewMode, config));
  };

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date);
    if (date.month() !== selectedDate.month()) {
      setCols(generateColHeaderByMode(MONTH, { ...config, date }));
    }
  };

  return (
    <ThemeProvider theme={appTheme}>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <div className={classes.container}>
          <Header
            onCollapse={() => setSidebar(!hasSidebar)}
            mode={mode}
            onModeChange={handleModeChange}
            selectedDate={selectedDate}
            onSelectDate={handleDateChange}
          />
          <div className={classes.body}>
            <div className={classes.sidebar}>sidebar</div>
            <div className={classes.content}>
              <SchedulerBoard
                cols={cols}
                resourceList={generateResourceList()}
                config={config}
              />
            </div>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
