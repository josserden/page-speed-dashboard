import React, { FC } from 'react';

import { ChartPie, Link2, Percent, TrendingDown, TrendingUp, Trophy } from 'lucide-react';

import { StatisticCard } from '@/app/(shared)/components/blocks/StatisticCard';
import { ITableRows } from '@/app/(shared)/utils/spreadsheet.service';
import { StatsService } from '@/app/(shared)/utils/stats.service';

export const MainStatistics: FC<{
  data: ITableRows;
}> = ({ data }) => {
  const stats = new StatsService(data);

  return (
    <div className="gap-10 space-y-5 md:grid md:grid-cols-3 md:space-y-0">
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

      <StatisticCard
        content={stats.getMetrics().fastest.loading_time}
        description={`${stats.getMetrics().fastest.version} - ${stats.getMetrics().fastest.url}`}
        icon={<TrendingUp color="#10b981" size={26} strokeWidth={2.5} />}
        title="Fastest Test"
      />

      <StatisticCard
        content={stats.getMetrics().smallest.loading_time}
        description={`${stats.getMetrics().smallest.version} - ${stats.getMetrics().smallest.url}`}
        icon={<TrendingDown color="#f43f5e" size={26} strokeWidth={2.5} />}
        title="Slowest Test"
      />

      <StatisticCard
        content={stats.getMetrics().performanceLeader.performance_score}
        description={`${stats.getMetrics().performanceLeader.version} - ${stats.getMetrics().performanceLeader.url}`}
        icon={<Trophy color="#f59e0b" size={26} strokeWidth={2.5} />}
        title="Performance Leader"
      />
    </div>
  );
};
