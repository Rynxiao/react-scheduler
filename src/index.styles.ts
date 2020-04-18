import { AugmentedTheme } from '@app/material/styles';
import { useStyles } from '@app/utils';

interface Props {
  sidebarWidth: string | number;
  borderRight: string;
  contentWidth: string | number;
}

export const sidebarStyles = (hasSidebar: boolean, theme: AugmentedTheme) => ({
  sidebarWidth: hasSidebar ? '300px' : 0,
  borderRight: hasSidebar ? `1px solid ${theme.palette.divider}` : 'none',
  contentWidth: hasSidebar ? 'calc(100% - 300px)' : '100%',
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
    width: (props: Props) => props.sidebarWidth,
    height: '100%',
    borderRight: (props: Props) => props.borderRight,
    transition: 'width 0.2s ease-in',
    overflowX: 'hidden',
  },
  content: {
    width: (props: Props) => props.contentWidth,
    flexGrow: 1,
    transition: 'width 0.2s ease-in',
  },
  stickyCol: {
    position: 'sticky',
    left: 0,
  },
}));

export default useIndexStyles;
