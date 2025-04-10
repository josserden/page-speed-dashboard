'use client';

import { Card, CardBody, Link, Tab, Tabs } from '@heroui/react';
import React, { useState } from 'react';

import Image from 'next/image';

import { Typography } from '@/app/(shared)/components/ui/typography';
import { LoginForm } from '@/app/(shared)/screens/login/LoginForm';

export default function LoginPage() {
  const [selected, setSelected] = useState<string>('login');

  return (
    <div className="flex h-full min-h-screen flex-grow items-center justify-center">
      <div className="container">
        <Card className="p-10">
          <Typography className="mb-10 text-center text-4xl">
            Welcome to <span className="font-bold text-primary">Dashboard</span>
          </Typography>

          <div className="container items-center justify-between lg:flex">
            <Image
              alt=""
              className="mx-auto mb-10 size-72 xl:size-[540px]"
              height={540}
              objectFit="cover"
              src={'/login-image.svg'}
              width={540}
            />

            <Card className="mx-auto w-full max-w-md border shadow">
              <CardBody className="overflow-hidden">
                <Tabs
                  aria-label="Tabs sizes"
                  className="mx-auto mb-10"
                  color="primary"
                  onSelectionChange={key => setSelected(String(key))}
                  radius="md"
                  selectedKey={selected}
                  size="lg"
                >
                  <Tab key="login" title={<Typography className="font-semibold">Login</Typography>}>
                    <LoginForm />

                    <Typography className="mt-6 text-center text-small">
                      Don’t have an account?{' '}
                      <Link onPress={() => setSelected('signup')} size="sm">
                        Sign Up
                      </Link>
                    </Typography>
                  </Tab>

                  <Tab
                    key="signup"
                    title={<Typography className="font-semibold">Sign Up</Typography>}
                  >
                    <LoginForm />

                    <Typography className="mt-6 text-center text-small">
                      Already have an account?{' '}
                      <Link onPress={() => setSelected('login')} size="sm">
                        Login
                      </Link>
                    </Typography>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
