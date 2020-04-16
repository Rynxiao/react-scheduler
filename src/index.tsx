import 'dayjs';
import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import DayjsUtils from '@date-io/dayjs';
import { appTheme } from '@app/utils';
import useIndexStyles, { sidebarStyles } from './index.styles';
import Header from './components/header';

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
