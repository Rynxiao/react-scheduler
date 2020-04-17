import 'dayjs';
import { MuiPickersUtilsProvider } from '@app/material/pickers';
import { ThemeProvider } from '@app/material/styles';
import { appTheme } from '@app/utils';
import DayjsUtils from '@date-io/dayjs';
import React, { useState } from 'react';
import Header from './components/header';
import useIndexStyles, { sidebarStyles } from './index.styles';

export default () => {
  const [sidebar, setSidebar] = useState(true);
  const classes = useIndexStyles(sidebarStyles(sidebar, appTheme));
  return (
    <ThemeProvider theme={appTheme}>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <div className={classes.container}>
          <Header onCollapse={() => setSidebar(!sidebar)} />
          <div className={classes.body}>
            <div className={classes.sidebar}>sidebar</div>
            <div className={classes.content}>content</div>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
