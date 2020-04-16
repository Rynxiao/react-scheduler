import { Theme as AugmentedTheme } from '@material-ui/core/styles';
import common from '@material-ui/core/colors/common';
import { useStyles } from '../../utils';

const useHeaderStyles = useStyles((theme: AugmentedTheme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  today: {
    color: common.white,
    borderColor: common.white,
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(3),
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
