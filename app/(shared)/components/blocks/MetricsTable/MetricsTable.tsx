'use client';

import React, { FC } from 'react';

import { ChevronDown, EllipsisVertical, Plus, Search } from 'lucide-react';

import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { capitalize } from '@heroui/shared-utils';

import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
  performanceScoreColorMap,
  versionOptions,
} from '@/app/(shared)/components/blocks/MetricsTable/MetricsTable.options';
import { BaseInput } from '@/app/(shared)/components/form/BaseInput';
import { IRowData } from '@/app/(shared)/utils/spreadsheet.service';

export const MetricsTable: FC<{
  data: IRowData[];
}> = ({ data }) => {
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [versionFilter, setVersionFilter] = React.useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'date_and_time',
    direction: 'descending',
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter(column => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredMetrics = [...data];

    if (hasSearchFilter) {
      filteredMetrics = filteredMetrics.filter(metric =>
        metric.url.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (versionFilter !== 'all' && Array.from(versionFilter).length !== versionOptions.length) {
      filteredMetrics = filteredMetrics.filter(metric =>
        Array.from(versionFilter).includes(metric.version),
      );
    }

    return filteredMetrics;
  }, [data, filterValue, hasSearchFilter, versionFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: IRowData, b: IRowData) => {
      const first = a[sortDescriptor.column as keyof IRowData];
      const second = b[sortDescriptor.column as keyof IRowData];

      // Спеціальна обробка для чисельних значень з одиницями виміру
      if (
        sortDescriptor.column === 'performance_score' ||
        sortDescriptor.column === 'cumulative_layout_shift'
      ) {
        return sortDescriptor.direction === 'descending'
          ? parseFloat(second) - parseFloat(first)
          : parseFloat(first) - parseFloat(second);
      }

      // Для часових значень (перетворення "2.6 s" -> 2.6)
      if (
        sortDescriptor.column === 'loading_time' ||
        sortDescriptor.column === 'first_contentful_paint' ||
        sortDescriptor.column === 'largest_contentful_paint' ||
        sortDescriptor.column === 'time_to_interactive'
      ) {
        const firstValue = parseFloat(first.replace(' s', ''));
        const secondValue = parseFloat(second.replace(' s', ''));
        return sortDescriptor.direction === 'descending'
          ? secondValue - firstValue
          : firstValue - secondValue;
      }

      // Для first_input_delay (перетворення "660 ms" -> 660)
      if (sortDescriptor.column === 'first_input_delay') {
        const firstValue = parseFloat(first.replace(' ms', ''));
        const secondValue = parseFloat(second.replace(' ms', ''));
        return sortDescriptor.direction === 'descending'
          ? secondValue - firstValue
          : firstValue - secondValue;
      }

      // Для дати
      if (sortDescriptor.column === 'date_and_time') {
        const dateA = new Date(first);
        const dateB = new Date(second);
        return sortDescriptor.direction === 'descending'
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      }

      // Для текстових даних
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((metric: IRowData, columnKey: React.Key) => {
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
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <BaseInput
            className="w-full sm:max-w-[44%]"
            onClear={() => onClear()}
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
          <span className="text-small text-default-400">Total {data.length} records</span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
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
  }, [
    onSearchChange,
    filterValue,
    versionFilter,
    visibleColumns,
    data.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          color="primary"
          isCompact
          onChange={setPage}
          page={page}
          showControls
          showShadow
          total={pages}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button isDisabled={pages === 1} onPress={onPreviousPage} size="sm" variant="flat">
            Previous
          </Button>
          <Button isDisabled={pages === 1} onPress={onNextPage} size="sm" variant="flat">
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages, onPreviousPage, onNextPage]);

  return (
    <Table
      aria-label="Performance metrics table with sorting and filtering"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'min-h-[400px]',
      }}
      isHeaderSticky
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={headerColumns}>
        {column => (
          <TableColumn
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={true}
            key={column.uid}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No metrics found'} items={sortedItems}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
