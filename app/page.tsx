import React from 'react';

import { MainStatistics } from '@/app/(shared)/components/blocks/MainStatistics';
import { MetricsTable } from '@/app/(shared)/components/blocks/MetricsTable';
import { columns } from '@/app/(shared)/components/blocks/MetricsTable/columns';
import { SpreadsheetService } from '@/app/(shared)/utils/spreadsheet.service';

export default async function Home() {
  const data = await SpreadsheetService.getTableRows();

  return (
    <div className="space-y-10 py-5">
      <MainStatistics data={data} />
      {data?.values && <MetricsTable columns={columns} data={data?.values} />}
    </div>
  );
}
