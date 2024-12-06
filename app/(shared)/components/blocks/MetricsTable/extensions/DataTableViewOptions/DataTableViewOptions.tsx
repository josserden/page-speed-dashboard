import React from 'react';

import { DataTableProps } from '@/app/(shared)/components/blocks/MetricsTable/extensions/types';
import { Button } from '@/app/(shared)/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/app/(shared)/components/ui/dropdown-menu';

export const DataTableViewOptions = <TData,>({ table }: DataTableProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto font-bold" variant="outline">
          Columns
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter(column => column.getCanHide())
          .map(column => {
            return (
              <DropdownMenuCheckboxItem
                checked={column.getIsVisible()}
                className="text-slaet-950 cursor-pointer capitalize"
                key={column.id}
                onCheckedChange={value => column.toggleVisibility(value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
