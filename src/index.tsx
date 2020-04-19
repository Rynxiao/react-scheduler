import eventList from '@app/_mockData/events';
import generateResourceList from '@app/_mockData/resources';
import SchedulerBoard from '@app/components/board';
import boardConfig from '@app/components/board/config';
import generateColHeaderByMode from '@app/components/board/utils/main';
import { MONTH } from '@app/components/constants';
import { BoardCol, BoardConfig, ModeKey } from '@app/components/types';
import { MuiPickersUtilsProvider } from '@app/material/pickers';
import { ThemeProvider } from '@app/material/styles';
import { appTheme } from '@app/utils';
import DayjsUtils from '@date-io/dayjs';
import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import Header from './components/header';
import useIndexStyles, { sidebarStyles } from './index.styles';

interface SchedulerBoardProps {
  options?: BoardConfig;
}

const Index: React.FC<SchedulerBoardProps> = ({
  options,
}) => {
  const [hasSidebar, setSidebar] = useState(true);
  const [config, setConfig] = React.useState<BoardConfig>({ ...boardConfig, ...options });
  const [cols, setCols] = React.useState<BoardCol[]>([]);
  const classes = useIndexStyles(sidebarStyles(hasSidebar, appTheme));

  useEffect(() => {
    setCols(generateColHeaderByMode(config.viewMode, config));
  }, []);

  const handleModeChange = (viewMode: ModeKey) => {
    setConfig({ ...config, viewMode });
    setCols(generateColHeaderByMode(viewMode, config));
  };

  const handleDateChange = (date: Dayjs) => {
    const newConfig = { ...config, date };
    if (date.month() !== config.date.month()) {
      setCols(generateColHeaderByMode(MONTH, newConfig));
    }
    setConfig(newConfig);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <div className={classes.container}>
          <Header
            onCollapse={() => setSidebar(!hasSidebar)}
            mode={config.viewMode}
            onModeChange={handleModeChange}
            selectedDate={config.date}
            onSelectDate={handleDateChange}
          />
          <div className={classes.body}>
            <div className={classes.sidebar}>sidebar</div>
            <div className={classes.content}>
              <SchedulerBoard
                cols={cols}
                resourceList={generateResourceList()}
                config={config}
                events={eventList}
              />
            </div>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default Index;
