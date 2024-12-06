import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

import { DataTableProps } from '@/app/(shared)/components/blocks/MetricsTable/extensions/types';
import { Button } from '@/app/(shared)/components/ui/button';

export const DataTablePagination = <TData,>({ table }: DataTableProps<TData>) => {
  return (
    <div className="flex items-center justify-start space-x-1 ">
      <Button
        className="font-semibold leading-7"
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
        size="sm"
        variant="outline"
      >
        <ArrowLeft />
      </Button>
      <Button
        className="font-semibold leading-7"
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
        size="sm"
        variant="outline"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};
