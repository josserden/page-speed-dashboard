import { useMemo, useState } from 'react';

import { Selection } from '@heroui/react';

import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
} from '@/app/(shared)/components/blocks/MetricsTable/MetricsTable.options';

export const useTableData = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter(column => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  return {
    headerColumns,
    selectedKeys,
    setSelectedKeys,
    setVisibleColumns,
    visibleColumns,
  };
};
