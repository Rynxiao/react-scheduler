import { DAY } from '@app/components/constants';
import { ModeKey } from '@app/components/types';
import { grey } from '@app/material/colors';
import { AugmentedTheme, fade } from '@app/material/styles';
import { useStyles } from '@app/utils';

export const generateColStyles = (width: number) => ({
  width,
  minWidth: width,
});

export const generateHeaderCellBorder = (viewMode: ModeKey, index: number, lines: number) => {
  if (viewMode === DAY) {
    return index % lines !== lines - 1 ? { borderRight: 'none' } : null;
  }
  return null;
};

const useBoardStyles = useStyles((theme: AugmentedTheme) => ({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    overflow: 'hidden',
    '& tr > th': {
      borderRight: `1px solid ${grey['300']}`,
    },
    '& tr > th:first-child': {
      backgroundColor: theme.palette.common.white,
    },
    '& tr > th:last-child': {
      borderRight: 'none',
    },
  },
  thead: {
    tableLayout: 'fixed',
  },
  headCell: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  body: {
    position: 'relative',
    height: 'calc(100% - 57px)',
    overflow: 'auto',
  },
  tbody: {
    width: '1400px',
    tableLayout: 'fixed',
    '& tr:last-child > td': {
      borderBottom: 'none',
    },
    '& tr > td:first-child': {
      backgroundColor: theme.palette.common.white,
      zIndex: theme.zIndex.modal,
    },
    '& tr > td:last-child': {
      borderRight: 'none',
    },
  },
  bodyCell: {
    backgroundColor: grey['100'],
    borderRight: `1px solid ${grey['300']}`,
    padding: 0,
  },
  workingCell: {
    backgroundColor: theme.palette.common.white,
  },
  stickyCol: {
    position: 'sticky',
    left: 0,
    borderRight: `1px solid ${grey['300']}`,
  },
  fixedCol: {
    '&::after': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: '-1px',
      width: '30px',
      transform: 'translateX(100%)',
      transition: 'box-shadow .3s',
      content: '""',
      pointerEvents: 'none',
      boxShadow: `inset 10px 0 8px -8px ${fade(theme.palette.common.black, 0.15)}`,
    },
  },
}));

export default useBoardStyles;
