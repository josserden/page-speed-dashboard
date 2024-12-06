import { ChartPie, Link2, Percent, TrendingDown, TrendingUp, Trophy } from 'lucide-react';
import React, { FC } from 'react';

import { StatisticCard } from '@/app/(shared)/components/blocks/StatisticCard';
import { Card } from '@/app/(shared)/components/ui/card';
import { ITableRows } from '@/app/(shared)/utils/spreadsheet.service';
import { StatsService } from '@/app/(shared)/utils/stats.service';

export const MainStatistics: FC<{
  data: ITableRows;
}> = ({ data }) => {
  const stats = new StatsService(data);

  return (
    <div className="grid grid-cols-3 gap-10">
      <StatisticCard
        content={data.values.length}
        description="All tests from available data"
        icon={<ChartPie color="#6366f1" size={26} strokeWidth={2.5} />}
        title="Total Tests"
      />

      <StatisticCard
        content={stats.mostAnalyzedUrl().count}
        description={stats.mostAnalyzedUrl().url}
        icon={<Link2 color="#06b6d4" size={26} strokeWidth={2.5} />}
        title="Most Analyzed URL"
      />

      <StatisticCard
        content={`${stats.desktopVsMobile().desktop}% / ${stats.desktopVsMobile().mobile}%`}
        description="Comparison of the number of tests between desktop and mobile"
        icon={<Percent color="#d946ef" size={26} strokeWidth={2.5} />}
        title="Desktop vs Mobile"
      />

      <Card className="col-span-3 grid grid-cols-3  divide-x py-2 text-left">
        <StatisticCard
          content={stats.getMetrics().fastest.loading_time}
          description={`${stats.getMetrics().fastest.version} - ${stats.getMetrics().fastest.url}`}
          icon={<TrendingUp color="#10b981" size={26} strokeWidth={2.5} />}
          title="Fastest Test"
          variant="default"
        />

        <StatisticCard
          content={stats.getMetrics().smallest.loading_time}
          description={`${stats.getMetrics().smallest.version} - ${stats.getMetrics().smallest.url}`}
          icon={<TrendingDown color="#f43f5e" size={26} strokeWidth={2.5} />}
          title="Slowest Test"
          variant="default"
        />

        <StatisticCard
          content={stats.getMetrics().performanceLeader.performance_score}
          description={`${stats.getMetrics().performanceLeader.version} - ${stats.getMetrics().performanceLeader.url}`}
          icon={<Trophy color="#f59e0b" size={26} strokeWidth={2.5} />}
          title="Performance Leader"
          variant="default"
        />
      </Card>
    </div>
  );
};
