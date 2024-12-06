import { ColumnDef, flexRender } from '@tanstack/react-table';
import React from 'react';

import { DataTableProps } from '@/app/(shared)/components/blocks/MetricsTable/extensions/types';
import { TableBody, TableCell, TableRow } from '@/app/(shared)/components/ui/table';
import { Typography } from '@/app/(shared)/components/ui/typography';

interface ITableDataBodyRowProps<TData, TValue> extends DataTableProps<TData> {
  columns: ColumnDef<TData, TValue>[];
}

export const TableDataBodyRow = <TData, TValue>({
  columns,
  table,
}: ITableDataBodyRowProps<TData, TValue>) => {
  if (!table.getRowModel().rows?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="h-24 text-center" colSpan={columns.length}>
            <Typography>No results...</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {table.getRowModel().rows.map(row => (
        <TableRow data-state={row.getIsSelected() && 'selected'} key={row.id}>
          {row.getVisibleCells().map(cell => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};
