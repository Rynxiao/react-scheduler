import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@app/material/components';
import classNames from 'classnames';
import React, { useRef } from 'react';
import useStyles from './index.styles';

const columns = [
  {
    title: 'Full Name',
    width: 100,
    key: 'name',
  },
  {
    title: 'Age',
    width: 100,
    key: 'age',
  },
  {
    title: 'Column 1',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    key: '7',
    width: 150,
  },
  {
    title: 'Column 8',
    key: '8',
    width: 150,
  },
];

const rows: { key: number; name: string; age: number; address: string }[] = [];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 100; i++) {
  rows.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `Park no. ${i}`,
  });
}

const SchedulerBoard = () => {
  const classes = useStyles();
  const headRef = useRef(null);

  const renderColGroup = () => (
    <colgroup>
      {columns.map((column) => (<col key={column.key} width={column.width || 150} />))}
    </colgroup>
  );

  const handleBodyScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { target } = event;
    const { scrollLeft } = target as HTMLDivElement;
    if (headRef && headRef.current) {
      headRef.current.scrollLeft = scrollLeft;
    }
  };

  return (
    <div className={classes.container}>
      <TableContainer className={classes.header} ref={headRef}>
        <Table className={classes.thead}>
          {renderColGroup()}
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  className={classNames({ [classes.stickyCol]: index === 0 })}
                  key={column.key}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer className={classes.body} onScroll={handleBodyScroll}>
        <Table className={classes.tbody}>
          {renderColGroup()}
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key}>
                <TableCell className={classes.stickyCol}>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SchedulerBoard;
