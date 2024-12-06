import { flexRender } from '@tanstack/react-table';
import React from 'react';

import { DataTableProps } from '@/app/(shared)/components/blocks/MetricsTable/extensions/types';
import { TableHead, TableHeader, TableRow } from '@/app/(shared)/components/ui/table';

export const TableDataHeader = <TData,>({ table }: DataTableProps<TData>) => {
  return (
    <TableHeader className="bg-zinc-100">
      {table.getHeaderGroups().map(headerGroup => (
        <TableRow className="hover:bg-transparent" key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};
