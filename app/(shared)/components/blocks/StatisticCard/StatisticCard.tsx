import React, { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/(shared)/components/ui/card';

type Props = {
  title: string;
  icon: React.ReactNode;
  content: number | string;
  description: string;
  variant?: 'custom' | 'default';
};

export const StatisticCard: FC<Props> = ({
  content,
  description,
  icon,
  title,
  variant = 'custom',
}) => {
  const Component = variant === 'custom' ? Card : 'div';

  return (
    <Component>
      <CardHeader>
        <CardTitle className="flex justify-between text-lg font-bold text-slate-950">
          {title} {icon}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-2xl font-black">{content}</CardContent>

      <CardFooter>
        <CardDescription>{description}</CardDescription>
      </CardFooter>
    </Component>
  );
};
