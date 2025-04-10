import { useMemo, useState } from 'react';

import { SortDescriptor } from '@heroui/react';

import { IRowData } from '@/app/(shared)/utils/spreadsheet.service';

export const useTableSort = (items: IRowData[]) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'date_and_time',
    direction: 'descending',
  });

  const sortedItems = useMemo(() => {
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

  return {
    setSortDescriptor,
    sortDescriptor,
    sortedItems,
  };
};
