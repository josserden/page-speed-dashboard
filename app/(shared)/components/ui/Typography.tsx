import React, { FC, PropsWithChildren } from 'react';

import { cn } from '@/app/(shared)/lib/utils';

interface TypographyProps extends PropsWithChildren {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  className?: string;
}

export const Typography: FC<TypographyProps> = ({ as, children, className }) => {
  const Component = as ?? 'p';

  return (
    <Component
      className={cn(
        {
          'font-sans font-semibold text-slate-950':
            as === 'h1' || as === 'h2' || as === 'h3' || as === 'h4',
          'text-2xl': as === 'h3',
          'text-3xl': as === 'h2',
          'text-4xl font-bold lg:text-5xl': as === 'h1',
          'text-base leading-7': as === 'p',
          'text-xl': as === 'h4',
        },
        className,
      )}
    >
      {children}
    </Component>
  );
};
