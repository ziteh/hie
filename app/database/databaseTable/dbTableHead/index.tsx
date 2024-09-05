"use client";

import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
} from "@mui/material";
import { Order, Data, HeadCell } from "@/app/database/databaseTable/types";

interface Props {
  heads: HeadCell[];
  numSelected: number;
  order: Order;
  orderBy: number;
  rowCount: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: number) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DbTableHead(props: Props) {
  const {
    heads,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: number) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {heads.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
