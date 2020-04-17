import { blue } from '@app/material/colors';
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  responsiveFontSizes,
  StyleRules,
  AugmentedTheme,
} from '@app/material/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});
export const appTheme = responsiveFontSizes(theme);
const CLASS_PREFIX = 'rt-scheduler';

export const useStyles = (mixStyleWithThem: (theme: AugmentedTheme) => StyleRules) => (
  makeStyles(
    (indexTheme: AugmentedTheme) => createStyles(mixStyleWithThem(indexTheme)),
    { name: CLASS_PREFIX /* dev env works only */ },
  )
);
