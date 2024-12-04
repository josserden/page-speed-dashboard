import React from 'react';

import { StatisticsCard } from '@/app/(shared)/components/layout/StatisticsCard/StatisticsCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/(shared)/components/ui/table';
import { SpreadsheetService } from '@/app/(shared)/utils/spreadsheet.service';

export default async function Home() {
  const data = await SpreadsheetService.getTableRows();

  return (
    <div className="space-y-10 py-5">
      <div className="">
        <StatisticsCard data={data?.values} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {data?.headers.map(header => (
              <TableHead className="font-medium" key={header.toLowerCase()}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.values.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map(cell => (
                <TableCell className="font-medium" key={cell.date_and_time}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
