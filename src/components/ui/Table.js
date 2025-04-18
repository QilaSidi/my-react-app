import React from 'react';
import { Table as MuiTable, TableBody as MuiTableBody, TableCell as MuiTableCell, TableHead as MuiTableHead, TableRow as MuiTableRow } from '@mui/material';

const Table = ({ children }) => {
  return <MuiTable>{children}</MuiTable>;
};

const TableHeader = ({ children }) => {
  return <MuiTableHead>{children}</MuiTableHead>;
};

const TableBodyComponent = ({ children }) => {
  return <MuiTableBody>{children}</MuiTableBody>;
};

const TableCellComponent = ({ children }) => {
  return <MuiTableCell>{children}</MuiTableCell>;
};

export { Table, TableHeader, TableBodyComponent as TableBody, TableCellComponent as TableCell };
