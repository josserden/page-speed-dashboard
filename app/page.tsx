import React from 'react';

import { redirect } from 'next/navigation';

import { MainStatistics } from '@/app/(shared)/components/blocks/MainStatistics';
import { MetricsTable } from '@/app/(shared)/components/blocks/MetricsTable';
import { Header } from '@/app/(shared)/components/ui/Header';
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
    <>
      <Header />

      <div className="space-y-10 p-6">
        <MainStatistics data={tableData} />
        {tableData?.values && <MetricsTable data={tableData?.values} />}
      </div>
    </>
  );
}
