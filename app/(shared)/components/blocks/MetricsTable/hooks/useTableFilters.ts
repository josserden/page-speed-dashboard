import { useCallback, useMemo, useState } from 'react';

import { Selection } from '@heroui/react';

import { versionOptions } from '@/app/(shared)/components/blocks/MetricsTable/MetricsTable.options';
import { IRowData } from '@/app/(shared)/utils/spreadsheet.service';

export const useTableFilters = (data: IRowData[]) => {
  const [filterValue, setFilterValue] = useState('');
  const [versionFilter, setVersionFilter] = useState<Selection>('all');

  const hasSearchFilter = Boolean(filterValue);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
  }, []);

  const filteredItems = useMemo(() => {
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

  return {
    filteredItems,
    filterValue,
    hasSearchFilter,
    onClear,
    onSearchChange,
    setVersionFilter,
    versionFilter,
  };
};
