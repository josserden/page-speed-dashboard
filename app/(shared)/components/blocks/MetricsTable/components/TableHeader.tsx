import React, { FC } from 'react';

import { ChevronDown, Plus, Search } from 'lucide-react';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from '@heroui/react';
import { capitalize } from '@heroui/shared-utils';

import {
  columns,
  versionOptions,
} from '@/app/(shared)/components/blocks/MetricsTable/MetricsTable.options';
import { BaseInput } from '@/app/(shared)/components/form/BaseInput';

interface TableHeaderProps {
  filterValue: string;
  onClear: () => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchChange: (value?: string) => void;
  rowsPerPage: number;
  setVersionFilter: (value: Selection) => void;
  setVisibleColumns: (value: Selection) => void;
  totalRecords: number;
  versionFilter: Selection;
  visibleColumns: Selection;
}

export const TableHeader: FC<TableHeaderProps> = ({
  filterValue,
  onClear,
  onRowsPerPageChange,
  onSearchChange,
  rowsPerPage,
  setVersionFilter,
  setVisibleColumns,
  totalRecords,
  versionFilter,
  visibleColumns,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <BaseInput
          className="w-full sm:max-w-[44%]"
          onClear={onClear}
          onValueChange={onSearchChange}
          placeholder="Search by URL..."
          startContent={<Search />}
          value={filterValue}
        />

        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDown className="text-small" />} variant="flat">
                Version
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Version Filter"
              closeOnSelect={false}
              disallowEmptySelection
              onSelectionChange={setVersionFilter}
              selectedKeys={versionFilter}
              selectionMode="multiple"
            >
              {versionOptions.map(version => (
                <DropdownItem className="capitalize" key={version.uid}>
                  {capitalize(version.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDown className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Table Columns"
              closeOnSelect={false}
              disallowEmptySelection
              onSelectionChange={setVisibleColumns}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
            >
              {columns.map(column => (
                <DropdownItem className="capitalize" key={column.uid}>
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Button color="primary" endContent={<Plus />}>
            Add Test
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-small text-default-400">Total {totalRecords} records</span>

        <label className="flex items-center text-small text-default-400">
          Rows per page:
          <select
            className="bg-transparent text-small text-default-400 outline-none"
            onChange={onRowsPerPageChange}
            value={rowsPerPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
    </div>
  );
};
