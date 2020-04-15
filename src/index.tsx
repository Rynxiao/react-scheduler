import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { ThemeProvider } from '@material-ui/core/styles';
import { useIndexStyles } from './index.styles';
import { appTheme } from './utils';

export default () => {
  const classes = useIndexStyles();
  return (
    <ThemeProvider theme={appTheme}>
      <div className={classes.container}>
        <div>
          <Grid container>
            <Grid item xs={6}>
              <IconButton color="primary" aria-label="navigate_before">
                <NavigateBefore />
              </IconButton>
              <IconButton color="primary" aria-label="navigate_next">
                <NavigateNext />
              </IconButton>
              <span className={classes.root}>text</span>
            </Grid>
            <Grid item xs={6}>
              <IconButton aria-label="delete">
                <NavigateBefore />
              </IconButton>
            </Grid>
          </Grid>
        </div>
        <div className={classes.body}>
          body
        </div>
      </div>
    </ThemeProvider>
  );
};
