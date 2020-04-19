import { BoardCol, BoardConfig, Resource } from '@app/components/types';
import { Table, TableBody, TableCell, TableRow } from '@app/material/components';
import classNames from 'classnames';
import React from 'react';
import useStyles from '../index.styles';
import { isWorkingHour } from '../utils/main';

interface BoardBodyProps {
  cols: BoardCol[];
  config: BoardConfig;
  colGroups: React.ReactNode;
  resourceList: Resource[];
  renderFirstColCell(key: string, content: string | React.ReactNode): React.ReactNode;
  lines: number;
}

const SchedulerBoardBody: React.FC<BoardBodyProps> = ({
  config,
  cols,
  colGroups,
  resourceList,
  renderFirstColCell,
  lines,
}) => {
  const classes = useStyles();
  return (
    <Table className={classes.tbody}>
      {colGroups}
      <TableBody>
        {resourceList.map((resource) => {
          const resourceCellContent = resource.render ? resource.render(resource) : resource.name;
          return (
            <TableRow key={resource.id}>
              {renderFirstColCell(`${resource.id}${resource.name}`, resourceCellContent)}
              {cols.map((col, index) => (
                <TableCell
                  style={{ height: `${config.rowHeight}px` }}
                  className={classNames(classes.bodyCell, {
                    [classes.workingCell]: isWorkingHour(config, index, lines),
                  })}
                  align="center"
                  key={`${resource.id}${col.key}`}
                />
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SchedulerBoardBody;
