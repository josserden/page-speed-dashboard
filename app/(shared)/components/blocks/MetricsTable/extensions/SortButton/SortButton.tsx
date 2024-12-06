import { ArrowUpDown } from 'lucide-react';
import React, { FC } from 'react';

import { Button } from '@/app/(shared)/components/ui/button';
import { IRowData } from '@/app/(shared)/utils/spreadsheet.service';
import { Column } from '@tanstack/table-core';

type Props = {
  title: string;
  column: Column<IRowData, unknown>;
};

export const SortButton: FC<Props> = ({ column, title }) => {
  return (
    <Button
      className="gap-1 px-0.5 font-bold text-slate-950"
      onClick={() => column.toggleSorting(column.getIsSorted() !== 'desc')}
      variant="ghost"
    >
      {title}
      <ArrowUpDown className="size-4 text-slate-700" />
    </Button>
  );
};
