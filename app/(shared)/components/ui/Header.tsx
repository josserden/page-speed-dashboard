'use client';

import React, { FC } from 'react';

import { Gauge } from 'lucide-react';

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';

import { ThemeSwitcher } from '@/app/(shared)/components/ui/ThemeSwitcher';
import { Typography } from '@/app/(shared)/components/ui/Typography';
import { logout } from '@/app/(shared)/utils/supabase/actions';

export const Header: FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarBrand className="flex items-center gap-2 text-primary">
        <Gauge />
        <Typography className="text-2xl font-extrabold text-primary">Dashboard</Typography>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            className="font-medium"
            color="primary"
            isLoading={isLoading}
            onPress={handleLogout}
            variant="flat"
          >
            Logout
          </Button>
        </NavbarItem>

        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
