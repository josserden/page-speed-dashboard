import React, { FC } from 'react';

import { EllipsisVertical } from 'lucide-react';

import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';

import { performanceScoreColorMap } from '@/app/(shared)/components/blocks/MetricsTable/MetricsTable.options';
import { IRowData } from '@/app/(shared)/utils/spreadsheet.service';

interface MetricCellProps {
  columnKey: React.Key;
  metric: IRowData;
}

export const MetricCell: FC<MetricCellProps> = ({ columnKey, metric }) => {
  const cellValue = metric[columnKey as keyof IRowData];

  switch (columnKey) {
    case 'actions':
      return (
        <div className="relative flex items-center justify-end gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <EllipsisVertical className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="view">View Details</DropdownItem>
              <DropdownItem key="export">Export</DropdownItem>
              <DropdownItem key="delete">Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    case 'performance_score':
      return (
        <Chip
          className="text-bold"
          color={performanceScoreColorMap(cellValue)}
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      );
    case 'url':
      return (
        <div className="flex flex-col">
          <p className="text-bold max-w-xs truncate text-small" title={cellValue}>
            {cellValue}
          </p>
        </div>
      );
    case 'version':
      return (
        <Chip
          className="capitalize"
          color={cellValue === 'mobile' ? 'primary' : 'secondary'}
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      );
    default:
      return cellValue;
  }
};
