import { Theme as AugmentedTheme } from '@material-ui/core/styles';
import { useStyles } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const useIndexStyles = useStyles((indexTheme: AugmentedTheme) => ({
  container: {
    width: '100%',
    height: '100%',
    border: `1px solid ${indexTheme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    color: indexTheme.palette.primary.main,
  },
}));
