import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Gauge } from 'lucide-react';
import React from 'react';

import { redirect } from 'next/navigation';

import { MainStatistics } from '@/app/(shared)/components/blocks/MainStatistics';
import { MetricsTable } from '@/app/(shared)/components/blocks/MetricsTable';
import { columns } from '@/app/(shared)/components/blocks/MetricsTable/columns';
import { ThemeSwitcher } from '@/app/(shared)/components/ui/ThemeSwitcher';
import { Typography } from '@/app/(shared)/components/ui/typography';
import { SpreadsheetService } from '@/app/(shared)/utils/spreadsheet.service';
import { logout } from '@/app/(shared)/utils/supabase/actions';
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
      <Navbar isBordered maxWidth="full">
        <NavbarBrand className="flex items-center gap-2 text-primary">
          <Gauge />
          <Typography className="text-2xl font-extrabold text-primary">Dashboard</Typography>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button className="font-medium" color="primary" onPress={logout} variant="flat">
              Logout
            </Button>
          </NavbarItem>

          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="space-y-10 p-6">
        <MainStatistics data={tableData} />
        {tableData?.values && <MetricsTable columns={columns} data={tableData?.values} />}
      </div>
    </>
  );
}
