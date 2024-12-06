import { RowData, Table } from '@tanstack/table-core';

export interface DataTableProps<TData extends RowData> {
  table: Table<TData>;
}
