import { Info } from 'lucide-react';
import React, { FC } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/(shared)/components/ui/tooltip';
import { Typography } from '@/app/(shared)/components/ui/typography';

export const ColumnTooltip: FC<{
  content: string;
}> = ({ content }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Info size={12} />
        </TooltipTrigger>

        <TooltipContent>
          <Typography>{content}</Typography>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
