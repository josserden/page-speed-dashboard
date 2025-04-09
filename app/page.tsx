import React from 'react';

import { redirect } from 'next/navigation';

import { MainStatistics } from '@/app/(shared)/components/blocks/MainStatistics';
import { MetricsTable } from '@/app/(shared)/components/blocks/MetricsTable';
import { columns } from '@/app/(shared)/components/blocks/MetricsTable/columns';
import { SpreadsheetService } from '@/app/(shared)/utils/spreadsheet.service';
import { createClient } from '@/app/(shared)/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const tableData = await SpreadsheetService.getTableRows();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className="space-y-10 py-5">
      <MainStatistics data={tableData} />
      {tableData?.values && <MetricsTable columns={columns} data={tableData?.values} />}
    </div>
  );
}
