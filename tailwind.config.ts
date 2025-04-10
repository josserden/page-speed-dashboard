import type { Config } from 'tailwindcss';

import { heroui } from '@heroui/react';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class'],
  plugins: [
    require('tailwindcss-animate'),
    heroui({
      addCommonColors: true,
    }),
  ],

  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },

      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
} satisfies Config;
