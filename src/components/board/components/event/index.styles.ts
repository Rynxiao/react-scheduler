import { AugmentedTheme } from '@app/material/styles';
import { useStyles } from '@app/utils';

const useEventBoardStyles = useStyles((theme: AugmentedTheme) => ({
  eventBoard: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  eventItemWrapper: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5),
    boxSizing: 'border-box',
    boxShadow: theme.shadows[2],
  },
  eventItem: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

export default useEventBoardStyles;
