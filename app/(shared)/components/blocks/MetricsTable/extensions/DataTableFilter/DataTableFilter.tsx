import React from 'react';

import { DataTableProps } from '@/app/(shared)/components/blocks/MetricsTable/extensions/types';
import { Input } from '@/app/(shared)/components/ui/input';

export const DataTableFilter = <TData,>({ table }: DataTableProps<TData>) => {
  return (
    <Input
      className="max-w-sm"
      onChange={event => table.getColumn('url')?.setFilterValue(event.target.value)}
      placeholder="Filter urls..."
      value={(table.getColumn('url')?.getFilterValue() as string) ?? ''}
    />
  );
};
