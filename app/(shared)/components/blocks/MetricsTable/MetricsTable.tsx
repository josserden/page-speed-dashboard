'use client';

import React, { FC, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader as TableHeaderComponent,
  TableRow,
} from '@heroui/react';

import { MetricCell } from '@/app/(shared)/components/blocks/MetricsTable/components/MetricCell';
import { TableFooter } from '@/app/(shared)/components/blocks/MetricsTable/components/TableFooter';
import { TableHeader } from '@/app/(shared)/components/blocks/MetricsTable/components/TableHeader';
import { useTableData } from '@/app/(shared)/components/blocks/MetricsTable/hooks/useTableData';
import { useTableFilters } from '@/app/(shared)/components/blocks/MetricsTable/hooks/useTableFilters';
import { useTablePagination } from '@/app/(shared)/components/blocks/MetricsTable/hooks/useTablePagination';
import { useTableSort } from '@/app/(shared)/components/blocks/MetricsTable/hooks/useTableSort';
import { IRowData } from '@/app/(shared)/utils/spreadsheet.service';

export const MetricsTable: FC<{
  data: IRowData[];
}> = ({ data }) => {
  const { filteredItems, filterValue, onClear, onSearchChange, setVersionFilter, versionFilter } =
    useTableFilters(data);

  const { headerColumns, selectedKeys, setSelectedKeys, setVisibleColumns, visibleColumns } =
    useTableData();

  const {
    items,
    onNextPage,
    onPreviousPage,
    onRowsPerPageChange,
    page,
    pages,
    resetPage,
    rowsPerPage,
    setPage,
  } = useTablePagination(filteredItems);

  const { setSortDescriptor, sortDescriptor, sortedItems } = useTableSort(items);

  useEffect(() => {
    resetPage();
  }, [filterValue, versionFilter, resetPage]);

  return (
    <Table
      aria-label="Performance metrics table with sorting and filtering"
      bottomContent={
        <TableFooter
          filteredItemsLength={filteredItems.length}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          page={page}
          pages={pages}
          selectedKeys={selectedKeys}
          setPage={setPage}
        />
      }
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
      topContent={
        <TableHeader
          filterValue={filterValue}
          onClear={onClear}
          onRowsPerPageChange={onRowsPerPageChange}
          onSearchChange={onSearchChange}
          rowsPerPage={rowsPerPage}
          setVersionFilter={setVersionFilter}
          setVisibleColumns={setVisibleColumns}
          totalRecords={data.length}
          versionFilter={versionFilter}
          visibleColumns={visibleColumns}
        />
      }
      topContentPlacement="outside"
    >
      <TableHeaderComponent columns={headerColumns}>
        {column => (
          <TableColumn
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={true}
            key={column.uid}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeaderComponent>

      <TableBody emptyContent={'No metrics found'} items={sortedItems}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => (
              <TableCell>
                <MetricCell columnKey={columnKey} metric={item} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
