import React, { FC } from 'react';

import { Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react';

import { Typography } from '@/app/(shared)/components/ui/Typography';

type Props = {
  title: string;
  icon: React.ReactNode;
  content: number | string;
  description: string;
};

export const StatisticCard: FC<Props> = ({ content, description, icon, title }) => {
  return (
    <Card isPressable>
      <CardHeader className="flex items-center justify-between">
        <Typography className="text-lg font-medium text-slate-950">{title}</Typography>
        {icon}
      </CardHeader>
      <Divider />
      <CardBody className="text-2xl font-bold text-secondary-600">{content}</CardBody>
      <CardFooter>
        <Typography className="text-sm font-normal text-default-400">{description}</Typography>
      </CardFooter>
    </Card>
  );
};
