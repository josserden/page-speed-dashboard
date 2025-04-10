'use client';

import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import React from 'react';

import { Typography } from '@/app/(shared)/components/ui/typography';
import { LoginForm } from '@/app/(shared)/screens/login/LoginForm';
import { login, signup } from '@/app/(shared)/utils/supabase/actions';

export default function LoginPage() {
  return (
    <div className="flex h-full min-h-screen flex-grow items-center justify-center">
      {/*<div className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-default-300 p-10 shadow">*/}
      <Card className="w-full max-w-md">
        <CardBody className="overflow-hidden">
          <Tabs aria-label="Tabs sizes" className="mx-auto" color="primary" radius="md" size="lg">
            <Tab
              className="flex w-full"
              key="login"
              title={<Typography className="font-semibold">Login</Typography>}
            >
              <LoginForm />
            </Tab>

            <Tab key="signup" title={<Typography className="font-semibold">Sign Up</Typography>}>
              <LoginForm />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
