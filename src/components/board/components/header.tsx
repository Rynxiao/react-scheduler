import { BoardCol, BoardConfig } from '@app/components/types';
import {
  Table, TableCell, TableHead, TableRow,
} from '@app/material/components';
import React from 'react';
import useStyles, { generateHeaderCellBorder } from '../index.styles';

interface BoardHeaderProps {
  cols: BoardCol[];
  config: BoardConfig;
  colGroups: React.ReactNode;
  firstCollCell: React.ReactNode;
  lines: number;
}

const SchedulerBoardHeader: React.FC<BoardHeaderProps> = ({
  config,
  cols,
  colGroups,
  firstCollCell,
  lines,
}) => {
  const classes = useStyles();
  return (
    <Table className={classes.thead}>
      {colGroups}
      <TableHead>
        <TableRow>
          {firstCollCell}
          {cols.map((col, index) => (
            <TableCell
              style={generateHeaderCellBorder(config.viewMode, index, lines)}
              className={classes.headCell}
              align="center"
              key={col.key}
            >
              {col.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </Table>
  );
};

export default SchedulerBoardHeader;
