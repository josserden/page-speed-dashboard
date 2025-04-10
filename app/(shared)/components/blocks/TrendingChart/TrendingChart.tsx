'use client';

import { TrendingUp } from 'lucide-react';
import React, { FC } from 'react';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

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

export interface TrendingChartProps {
  chartData: Record<string, string>[];
}

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

export const TrendingChart: FC<TrendingChartProps> = ({ chartData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tickFormatter={value => value.slice(0, 3)}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Line
              dataKey="desktop"
              dot={false}
              stroke="var(--color-desktop)"
              strokeWidth={2}
              type="monotone"
            />
            <Line
              dataKey="mobile"
              dot={false}
              stroke="var(--color-mobile)"
              strokeWidth={2}
              type="monotone"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
