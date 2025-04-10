import React from 'react';

import { SquareArrowOutUpRight } from 'lucide-react';

import { MetricsTable } from '@/app/(shared)/components/blocks/MetricsTable';
import { PageBreadcrumb } from '@/app/(shared)/components/blocks/PageBreadcrumb';
import { TrendingChart } from '@/app/(shared)/components/blocks/TrendingChart';
import { Typography } from '@/app/(shared)/components/ui/Typography';
import { SpreadsheetService } from '@/app/(shared)/utils/spreadsheet.service';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const { chartData, currentRow, filteredRows } = await SpreadsheetService.getFilteredTableRows(id);

  console.log(currentRow);
  console.log(filteredRows);

  return (
    <div className="space-y-10 py-5">
      <PageBreadcrumb currentPath={id} />

      <div className="grid grid-cols-2">
        <div className="space-y-2.5">
          <Typography as="h1">{currentRow.url.replace('https://', '')}</Typography>

          <a
            className="relative inline-flex cursor-pointer items-center gap-x-1 text-nowrap transition-all duration-300 ease-in-out hover:text-blue-600"
            href={currentRow.url}
            rel="noreferrer noopener nofollow"
            target="_blank"
          >
            site <SquareArrowOutUpRight size={11} />
          </a>
        </div>

        <TrendingChart chartData={chartData} />
      </div>

      <MetricsTable data={filteredRows} />
    </div>
  );
}
