import React from 'react';

import { Spinner } from '@heroui/react';

import { cn } from '@/app/(shared)/lib/utils';

export default function Loading() {
  return (
    <div className={cn('fixed inset-0 z-[60] bg-black/25 backdrop-blur-md')}>
      <div className="flex min-h-dvh items-center justify-center">
        <Spinner
          classNames={{ label: 'text-foreground mt-4' }}
          label="simple"
          size="lg"
          variant="simple"
        />
      </div>
    </div>
  );
}
