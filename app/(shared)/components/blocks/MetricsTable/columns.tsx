'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SquareArrowOutUpRight } from 'lucide-react';
import React from 'react';

import Link from 'next/link';

import { ColumnTooltip } from '@/app/(shared)/components/blocks/MetricsTable/extensions/ColumnTooltip';
import { SortButton } from '@/app/(shared)/components/blocks/MetricsTable/extensions/SortButton';
import { Typography } from '@/app/(shared)/components/ui/typography';
import { cn, formatDate } from '@/app/(shared)/lib/utils';
import { IRowData } from '@/app/(shared)/utils/spreadsheet.service';

export const columns: ColumnDef<IRowData>[] = [
  {
    accessorKey: 'date_and_time',
    cell: ({ row }) => (
      <Link className="group" href={`/details/${row.original.id}`}>
        <Typography className="relative inline-flex cursor-pointer items-center gap-x-1 text-nowrap transition-all duration-300 ease-in-out after:absolute after:-bottom-0.5 after:left-0 after:block after:h-[1px] after:w-full after:bg-blue-500 after:opacity-0 after:transition-all after:duration-500 hover:text-blue-600 hover:after:opacity-100">
          {formatDate(row.original.date_and_time)}
          <SquareArrowOutUpRight size={11} />
        </Typography>
      </Link>
    ),
    header: ({ column }) => <SortButton column={column} title="Date" />,
    id: 'date_and_time',
  },
  {
    accessorKey: 'url',
    cell: ({ row }) => <Typography>{row.original.url}</Typography>,
    header: ({ column }) => <SortButton column={column} title="URL" />,
    id: 'url',
  },
  {
    accessorKey: 'version',
    cell: ({ row }) => <Typography>{row.original.version}</Typography>,
    header: ({ column }) => <SortButton column={column} title="Device" />,
    id: 'version',
  },
  {
    accessorKey: 'performance_score',
    cell: ({ row }) => (
      <Typography
        className={cn(
          'mx-auto rounded-lg text-center font-bold text-white',
          +row.original.performance_score >= 80 && 'bg-emerald-500',
          +row.original.performance_score >= 60 &&
            +row.original.performance_score < 80 &&
            'bg-amber-500',
          +row.original.performance_score < 60 && 'bg-rose-500',
        )}
      >
        {+row.original.performance_score}
      </Typography>
    ),
    header: ({ column }) => <SortButton column={column} title="Performance" />,
    id: 'performance_score',
  },
  {
    accessorKey: 'largest_contentful_paint',
    cell: ({ row }) => <Typography>{row.original.largest_contentful_paint}</Typography>,
    header: ({ column }) => (
      <div className="inline-flex items-center gap-x-1">
        <SortButton column={column} title="LCP" />
        <ColumnTooltip content="Largest Contentful Paint" />
      </div>
    ),
    id: 'largest_contentful_paint',
  },
  {
    accessorKey: 'cumulative_layout_shift',
    cell: ({ row }) => <Typography>{row.original.cumulative_layout_shift}</Typography>,
    header: ({ column }) => (
      <div className="inline-flex items-center gap-x-1">
        <SortButton column={column} title="CLS" />
        <ColumnTooltip content="Cumulative Layout Shift" />
      </div>
    ),
    id: 'cumulative_layout_shift',
  },
  {
    accessorKey: 'first_input_delay',
    cell: ({ row }) => <Typography>{row.original.first_input_delay}</Typography>,
    header: ({ column }) => (
      <div className="inline-flex items-center gap-x-1">
        <SortButton column={column} title="FID" />
        <ColumnTooltip content="First Input Delay" />
      </div>
    ),
    id: 'first_input_delay',
  },
  {
    accessorKey: 'first_contentful_paint',
    cell: ({ row }) => <Typography>{row.original.first_contentful_paint}</Typography>,
    header: ({ column }) => (
      <div className="inline-flex items-center gap-x-1">
        <SortButton column={column} title="FCP" />
        <ColumnTooltip content="First Contentful Paint" />
      </div>
    ),
    id: 'first_contentful_paint',
  },
  {
    accessorKey: 'time_to_interactive',
    cell: ({ row }) => <Typography>{row.original.time_to_interactive}</Typography>,
    header: ({ column }) => (
      <div className="inline-flex items-center gap-x-1">
        <SortButton column={column} title="TTI" />
        <ColumnTooltip content="Time to Interactive" />
      </div>
    ),
    id: 'time_to_interactive',
  },
  {
    accessorKey: 'loading_time',
    cell: ({ row }) => <Typography>{row.original.loading_time}</Typography>,
    header: ({ column }) => <SortButton column={column} title="Loading Time" />,
    id: 'loading_time',
  },
];
