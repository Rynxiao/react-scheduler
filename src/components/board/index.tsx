import { getLines } from '@app/components/board/utils';
import { BoardCol, BoardConfig, Resource } from '@app/components/types';
import { TableCell, TableContainer } from '@app/material/components';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import SchedulerBoardBody from './components/body';
import SchedulerBoardHeader from './components/header';
import useStyles, { generateColStyles } from './index.styles';

export interface SchedulerBoardProps {
  cols: BoardCol[];
  resourceList?: Resource[];
  config: BoardConfig;
}

const SchedulerBoard: React.FC<SchedulerBoardProps> = ({
  cols,
  resourceList = [],
  config,
}) => {
  const classes = useStyles();
  const headRef = useRef(null);
  const bodyRef = useRef(null);
  const [shouldShowShadow, setShowShadow] = useState(false);
  const lines = getLines(config);

  const handleFirstColCellShadowShow = (left: number) => {
    if (left > 0 && !shouldShowShadow) {
      setShowShadow(true);
    } else if (left === 0 && shouldShowShadow) {
      setShowShadow(false);
    }
  };

  const scrollElement = (ref: React.MutableRefObject<HTMLDivElement>, left: number) => {
    const eleRef = ref;
    if (eleRef && eleRef.current) {
      setTimeout(() => {
        eleRef.current.scrollLeft = left;
      });
    }
  };

  useEffect(() => {
    const initialLeft = lines * config.dayStartFrom * config.dayCellWidth;
    scrollElement(headRef, initialLeft);
    scrollElement(bodyRef, initialLeft);
    handleFirstColCellShadowShow(initialLeft);
  }, [lines, headRef, bodyRef]);

  const renderColGroup = () => (
    <colgroup>
      {!config.hiddenResourceCol && <col key="resourceCol" style={generateColStyles(config.resourceColWidth)} />}
      {cols.map((col) => (<col key={col.key} style={generateColStyles(col.width)} />))}
    </colgroup>
  );

  const handleBodyScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { target } = event;
    const left = (target as HTMLDivElement).scrollLeft;
    if (headRef && headRef.current) {
      headRef.current.scrollLeft = left;
      handleFirstColCellShadowShow(left);
    }
  };

  const renderFirstColCell = (key: string, title: string | React.ReactNode) => {
    if (!config.hiddenResourceCol) {
      return (
        <TableCell
          key={key}
          className={classNames(classes.stickyCol, { [classes.fixedCol]: shouldShowShadow })}
          align="center"
        >
          {title}
        </TableCell>
      );
    }
    return null;
  };

  return (
    <div className={classes.container}>
      <TableContainer className={classes.header} ref={headRef}>
        <SchedulerBoardHeader
          cols={cols}
          config={config}
          colGroups={renderColGroup()}
          firstCollCell={renderFirstColCell('resourceTitle', config.resourceTitle)}
          lines={lines}
        />
      </TableContainer>
      <TableContainer
        className={classes.body}
        onScroll={handleBodyScroll}
        ref={bodyRef}
      >
        <SchedulerBoardBody
          cols={cols}
          config={config}
          colGroups={renderColGroup()}
          resourceList={resourceList}
          renderFirstColCell={(key, content) => renderFirstColCell(key, content)}
          lines={lines}
        />
        <div className={classes.eventBoard}>event board</div>
      </TableContainer>
    </div>
  );
};

export default SchedulerBoard;
