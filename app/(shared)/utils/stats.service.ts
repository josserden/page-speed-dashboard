import { ITableRows } from '@/app/(shared)/utils/spreadsheet.service';

export class StatsService {
  private data: ITableRows;

  constructor(data: ITableRows) {
    this.data = data;
  }

  desktopVsMobile() {
    const desktop = this.data.values.filter(row => row.version === 'desktop').length;
    const mobile = this.data.values.filter(row => row.version === 'mobile').length;

    const total = desktop + mobile;

    return {
      desktop: (desktop / total) * 100,
      mobile: (mobile / total) * 100,
    };
  }

  getMetrics() {
    const parseTime = (time: string) => parseFloat(time.replace(/[^\d.]/g, ''));

    const fastest = this.data.values.reduce((prev, curr) => {
      return parseTime(curr.loading_time) < parseTime(prev.loading_time) ? curr : prev;
    });

    const smallest = this.data.values.reduce((prev, curr) => {
      return parseTime(curr.loading_time) > parseTime(prev.loading_time) ? curr : prev;
    });

    const performanceLeader = this.data.values.reduce((prev, curr) => {
      return parseInt(curr.performance_score, 10) > parseInt(prev.performance_score, 10)
        ? curr
        : prev;
    });

    return {
      fastest: {
        loading_time: fastest.loading_time,
        url: fastest.url,
        version: fastest.version,
      },
      performanceLeader: {
        performance_score: performanceLeader.performance_score,
        url: performanceLeader.url,
        version: performanceLeader.version,
      },
      smallest: {
        loading_time: smallest.loading_time,
        url: smallest.url,
        version: smallest.version,
      },
    };
  }

  mostAnalyzedUrl() {
    const urls = this.data.values.map(row => row.url);

    const urlCount = urls.reduce<Record<string, number>>((acc, url) => {
      acc[url] = (acc[url] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(urlCount).reduce(
      (acc, [url, count]) => {
        if (count > acc.count) {
          acc = { count, url };
        }
        return acc;
      },
      { count: 0, url: '' } as { count: number; url: string },
    );
  }
}
