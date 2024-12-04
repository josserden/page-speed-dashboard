'use client';
import { TrendingUp } from 'lucide-react';
import React, { FC } from 'react';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/(shared)/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/(shared)/components/ui/chart';

const chartData = [
  { desktop: 186, mobile: 80, month: 'January' },
  { desktop: 305, mobile: 200, month: 'February' },
  { desktop: 237, mobile: 120, month: 'March' },
  { desktop: 73, mobile: 190, month: 'April' },
  { desktop: 209, mobile: 130, month: 'May' },
  { desktop: 214, mobile: 140, month: 'June' },
];

const chartConfig = {
  desktop: {
    color: 'hsl(var(--chart-1))',
    label: 'Desktop',
  },
  mobile: {
    color: 'hsl(var(--chart-2))',
    label: 'Mobile',
  },
} satisfies ChartConfig;

import { IRowData } from '@/app/(shared)/utils/spreadsheet.service';

interface ChartData {
  desktop: number;
  mobile: number;
  month: string;
}

function calculateTrend(data: ChartData[]): string {
  const sortedData = data.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  if (sortedData.length < 2) return '0%';

  const lastMonth = sortedData[sortedData.length - 1];
  const prevMonth = sortedData[sortedData.length - 2];

  const lastMonthTotal = lastMonth.desktop + lastMonth.mobile;
  const prevMonthTotal = prevMonth.desktop + prevMonth.mobile;

  if (prevMonthTotal === 0) return '0%';

  const trend = ((lastMonthTotal - prevMonthTotal) / prevMonthTotal) * 100;

  return `${trend.toFixed(1)}%`;
}

function calculateTotalRuns(data: IRowData[]): number {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  return data.filter(item => new Date(item.date_and_time) >= sixMonthsAgo).length;
}

function generateChartData(data: IRowData[]): ChartData[] {
  // Групуємо дані за місяцями
  const groupedByMonth = data.reduce<Record<string, { desktop: number; mobile: number }>>(
    (acc, item) => {
      const month = new Date(item.date_and_time).toLocaleString('en-US', { month: 'long' });
      const version = item.version;

      if (!acc[month]) {
        acc[month] = { desktop: 0, mobile: 0 };
      }

      // Додаємо значення performance_score як приклад
      acc[month][version] += parseInt(item.performance_score, 10) || 0;

      return acc;
    },
    {},
  );

  // Перетворюємо на масив для графіка
  return Object.entries(groupedByMonth).map(([month, values]) => ({
    desktop: values.desktop,
    mobile: values.mobile,
    month,
  }));
}

export const StatisticsCard: FC<{ data?: IRowData[] }> = ({ data }) => {
  const chartData = generateChartData(data);
  const trend = calculateTrend(chartData);
  const totalRuns = calculateTotalRuns(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Data by Month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tickFormatter={value => value.slice(0, 3)}
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} cursor={false} />
            <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
            <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <TrendingUp size={16} />
          Trending up by {trend} this month
        </div>
        <div className="leading-none text-muted-foreground">
          Total analyses in the last 6 months: {totalRuns}
        </div>
      </CardFooter>
    </Card>
  );
};
