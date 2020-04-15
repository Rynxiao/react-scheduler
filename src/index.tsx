import React from 'react';
import Grid from '@material-ui/core/Grid';
import AccessAlarm from '@material-ui/icons/AccessAlarm';
import styles from './index.module.scss';

export default () => (
  <div className={styles.container}>
    <div className={styles.header}>
      <Grid container spacing={3}>
        <Grid item xs={6}><AccessAlarm /></Grid>
        <Grid item xs={6}><AccessAlarm /></Grid>
      </Grid>
    </div>
  </div>
);
