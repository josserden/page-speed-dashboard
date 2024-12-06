'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';

import { DataTableFilter } from '@/app/(shared)/components/blocks/MetricsTable/extensions/DataTableFilter';
import { DataTablePagination } from '@/app/(shared)/components/blocks/MetricsTable/extensions/DataTablePagination';
import { DataTableViewOptions } from '@/app/(shared)/components/blocks/MetricsTable/extensions/DataTableViewOptions';
import { TableDataBodyRow } from '@/app/(shared)/components/blocks/MetricsTable/extensions/TableDataBodyRow/TableDataBodyRow';
import { TableDataHeader } from '@/app/(shared)/components/blocks/MetricsTable/extensions/TableDataHeader';
import { Table } from '@/app/(shared)/components/ui/table';
import { IRowData } from '@/app/(shared)/utils/spreadsheet.service';

interface MetricsTableProps<TData extends IRowData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export const MetricsTable = <TData extends IRowData>({
  columns,
  data,
}: MetricsTableProps<TData>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      sorting,
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center">
        <DataTableFilter table={table} />
        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-xl border shadow">
        <Table>
          <TableDataHeader table={table} />
          <TableDataBodyRow columns={columns} table={table} />
        </Table>
      </div>

      {table.getRowModel().rows?.length > 0 && <DataTablePagination table={table} />}
    </div>
  );
};
