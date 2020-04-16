import { Theme as AugmentedTheme } from '@material-ui/core/styles';
import { useStyles } from './utils';

interface Props {
  width: string | number;
  borderRight: string;
}

export const sidebarStyles = (hasSidebar: boolean, theme: AugmentedTheme) => ({
  width: hasSidebar ? '300px' : 0,
  borderRight: hasSidebar ? `1px solid ${theme.palette.divider}` : 'none',
});

const useIndexStyles = useStyles((theme: AugmentedTheme) => ({
  container: {
    width: '100%',
    height: '100%',
    border: `1px solid ${theme.palette.divider}`,
    flexGrow: 1,
  },
  body: {
    width: '100%',
    height: 'calc(100% - 64px)',
    display: 'flex',
    flexShrink: 0,
  },
  sidebar: {
    width: (props: Props) => props.width,
    height: '100%',
    borderRight: (props: Props) => props.borderRight,
    transition: 'width 0.2s ease-in',
    overflowX: 'hidden',
  },
  content: {
    flexGrow: 1,
  },
}));

export default useIndexStyles;
