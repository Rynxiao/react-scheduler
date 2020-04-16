import { Theme as AugmentedTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import common from '@material-ui/core/colors/common';
import { useStyles } from '../../utils';

const useHeaderStyles = useStyles((theme: AugmentedTheme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  modeSelect: {
    marginLeft: theme.spacing(4),
    borderRadius: '4px',
    '&::before': {
      borderBottom: 'none',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
  },
  select: {
    color: theme.palette.common.white,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&.MuiSelect-select': {
      padding: theme.spacing(1, 5, 1, 3),
    },
  },
  icon: {
    fill: theme.palette.common.white,
  },
  today: {
    color: common.white,
    borderColor: common.white,
    padding: theme.spacing(0, 2),
    '&:hover': {
      borderColor: common.white,
    },
  },
  title: {
    flexGrow: 1,
  },
  datePicker: {
    visibility: 'hidden',
    width: 0,
  },
}));

export default useHeaderStyles;
