'use client';

import { Button } from '@heroui/react';
import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="bg-transparent"
      // color="transparent"
      color="default"
      isIconOnly
      onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Moon /> : <Sun />}
    </Button>
  );
};
