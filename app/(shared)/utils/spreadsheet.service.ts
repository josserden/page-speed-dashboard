import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import { GoogleSheetsApi } from '@/app/(shared)/api/google-sheets-api';

export interface ITableRows {
  headers: string[];
  values: IRowData[];
}

export interface IRowData {
  cumulative_layout_shift: string;
  date_and_time: string;
  first_contentful_paint: string;
  first_input_delay: string;
  largest_contentful_paint: string;
  loading_time: string;
  performance_score: string;
  time_to_interactive: string;
  url: string;
  version: string;
}

export const SpreadsheetService = {
  getTableRows: unstable_cache(
    async (): Promise<ITableRows> => {
      try {
        const data = await GoogleSheetsApi.getData();

        if (!data || !data.values || data.values.length === 0) {
          return notFound();
        }

        const headers: string[] = data.values[0];
        const rows: string[][] = data.values.slice(1);

        const result: IRowData[] = rows.map((row: string[]) => {
          return headers.reduce((acc, header, index) => {
            const normalizedHeader = header.toLowerCase().replace(/ /g, '_') as keyof IRowData;
            acc[normalizedHeader] = row[index] || '';

            return acc;
          }, {} as IRowData);
        });

        return {
          headers,
          values: result,
        };
      } catch (error) {
        console.error(error);
      }
    },
    ['rows'],
    { revalidate: 3600, tags: ['rows'] },
  ),
};
