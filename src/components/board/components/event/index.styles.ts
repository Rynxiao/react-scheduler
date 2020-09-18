import { BoardConfig } from '@app/components/types';
import { grey } from '@app/material/colors';
import { AugmentedTheme } from '@app/material/styles';
import { useStyles } from '@app/utils';

export const generateEventBoardStyles = (width: number, config: BoardConfig) => ({
  width: `${width}px`,
  left: config.hiddenResourceCol ? 0 : config.resourceColWidth,
});

const useEventBoardStyles = useStyles((theme: AugmentedTheme) => ({
  eventBoard: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  eventItemWrapper: {
    position: 'absolute',
    top: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5),
    boxSizing: 'border-box',
    boxShadow: theme.shadows[2],
    zIndex: 4,
  },
  eventItem: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  eventCell: {
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'top',
  },
  eventRow: {
    position: 'relative',
    width: '100%',
  },
  eventShadow: {
    position: 'absolute',
    top: 0,
    zIndex: 3,
    backgroundColor: grey['200'],
  },
}));

export default useEventBoardStyles;
