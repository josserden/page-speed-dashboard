import { createHash } from 'crypto';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import { getGoogleSheetsData } from '@/app/(shared)/api/google-sheets-api';
import { formatDate } from '@/app/(shared)/lib/utils';

export interface ITableRows {
  headers: string[];
  values: IRowData[];
}

export interface IRowData {
  cumulative_layout_shift: string;
  date_and_time: string;
  first_contentful_paint: string;
  first_input_delay: string;
  id: string;
  largest_contentful_paint: string;
  loading_time: string;
  performance_score: string;
  time_to_interactive: string;
  url: string;
  version: string;
}

const INITIAL_STATE: IRowData = {
  cumulative_layout_shift: '',
  date_and_time: '',
  first_contentful_paint: '',
  first_input_delay: '',
  id: '',
  largest_contentful_paint: '',
  loading_time: '',
  performance_score: '',
  time_to_interactive: '',
  url: '',
  version: '',
};

const generateHash = (input: string): string => createHash('md5').update(input).digest('hex');

const completeChartData = (data: IRowData[]) => {
  return data.map(row => ({
    desktop:
      data.find(
        item =>
          formatDate(item.date_and_time) === formatDate(row.date_and_time) &&
          item.version === 'desktop',
      )?.performance_score ?? '0',
    mobile:
      data.find(
        item =>
          formatDate(item.date_and_time) === formatDate(row.date_and_time) &&
          item.version === 'mobile',
      )?.performance_score ?? '0',
    month: formatDate(row.date_and_time),
  }));
};

export const SpreadsheetService = {
  getFilteredTableRows: async (
    rowId: string,
  ): Promise<{
    currentRow: IRowData;
    filteredRows: IRowData[];
    chartData: Record<string, string>[];
  }> => {
    try {
      const rows = await SpreadsheetService.getTableRows();

      if (!rows || !rows.values || rows.values.length === 0) {
        return notFound();
      }

      const currentRow = rows?.values?.find(row => row.id === rowId) ?? INITIAL_STATE;
      const filteredRows = rows?.values?.filter(row => row.url === currentRow?.url);
      const chartData = completeChartData(filteredRows);

      return {
        chartData,
        currentRow,
        filteredRows,
      };
    } catch (error) {
      console.error(error);
      return { chartData: [], currentRow: INITIAL_STATE, filteredRows: [] };
    }
  },

  getTableRows: unstable_cache(
    async (): Promise<ITableRows> => {
      try {
        const data = await getGoogleSheetsData();

        if (!data || !data.values || data.values.length === 0) {
          return notFound();
        }

        const headers: string[] = data.values[0];
        const rows: string[][] = data.values.slice(1);

        const result: IRowData[] = rows.map((row: string[]) => {
          const rowData = headers.reduce((acc, header, index) => {
            const normalizedHeader = header.toLowerCase().replace(/ /g, '_') as keyof IRowData;
            acc[normalizedHeader] = row[index] || '';
            return acc;
          }, {} as IRowData);

          return {
            ...rowData,
            id: generateHash(JSON.stringify(rowData)),
          };
        });

        return {
          headers,
          values: result ?? [],
        };
      } catch (error) {
        console.error(error);
        return { headers: [], values: [] };
      }
    },
    ['rows'],
    { revalidate: 3600, tags: ['rows'] },
  ),
};
