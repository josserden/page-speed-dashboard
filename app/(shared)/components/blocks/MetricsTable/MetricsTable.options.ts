export const columns = [
  { name: 'DATE AND TIME', uid: 'date_and_time' },
  { name: 'URL', uid: 'url' },
  { name: 'VERSION', uid: 'version' },
  { name: 'LOADING TIME', uid: 'loading_time' },
  { name: 'PERFORMANCE SCORE', uid: 'performance_score' },
  { name: 'FIRST CONTENTFUL PAINT', uid: 'first_contentful_paint' },
  { name: 'LARGEST CONTENTFUL PAINT', uid: 'largest_contentful_paint' },
  { name: 'TIME TO INTERACTIVE', uid: 'time_to_interactive' },
  { name: 'CUMULATIVE LAYOUT SHIFT', uid: 'cumulative_layout_shift' },
  { name: 'FIRST INPUT DELAY', uid: 'first_input_delay' },
];

export const versionOptions = [
  { name: 'Mobile', uid: 'mobile' },
  { name: 'Desktop', uid: 'desktop' },
];

export const performanceScoreColorMap = (score: string) => {
  const numScore = parseInt(score);

  if (numScore >= 90) return 'success';
  if (numScore >= 50) return 'warning';

  return 'danger';
};

export const INITIAL_VISIBLE_COLUMNS = [
  'date_and_time',
  'url',
  'version',
  'performance_score',
  'loading_time',
];
