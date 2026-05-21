import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#faf7f2',
          100: '#f4ead5',
          200: '#e8d4aa',
          300: '#d9b97c',
          400: '#c99b52',
          500: '#b8823a',
          600: '#9c6630',
          700: '#7d4e28',
          800: '#5c3820',
          900: '#3c2415',
          950: '#1e1108',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        warm: {
          css: {
            '--tw-prose-body': theme('colors.warm.900'),
            '--tw-prose-headings': theme('colors.warm.950'),
            '--tw-prose-links': theme('colors.warm.600'),
            '--tw-prose-bold': theme('colors.warm.900'),
            '--tw-prose-counters': theme('colors.warm.700'),
            '--tw-prose-bullets': theme('colors.warm.500'),
            '--tw-prose-hr': theme('colors.warm.200'),
            '--tw-prose-quotes': theme('colors.warm.700'),
            '--tw-prose-quote-borders': theme('colors.warm.300'),
            '--tw-prose-captions': theme('colors.warm.600'),
            '--tw-prose-code': theme('colors.warm.900'),
            '--tw-prose-pre-code': theme('colors.warm.100'),
            '--tw-prose-pre-bg': theme('colors.warm.900'),
            '--tw-prose-th-borders': theme('colors.warm.200'),
            '--tw-prose-td-borders': theme('colors.warm.100'),
            '--tw-prose-invert-body': theme('colors.warm.200'),
            '--tw-prose-invert-headings': theme('colors.warm.100'),
            '--tw-prose-invert-links': theme('colors.warm.300'),
            '--tw-prose-invert-bold': theme('colors.warm.200'),
            '--tw-prose-invert-counters': theme('colors.warm.400'),
            '--tw-prose-invert-bullets': theme('colors.warm.500'),
            '--tw-prose-invert-hr': theme('colors.warm.800'),
            '--tw-prose-invert-quotes': theme('colors.warm.300'),
            '--tw-prose-invert-quote-borders': theme('colors.warm.700'),
            '--tw-prose-invert-captions': theme('colors.warm.400'),
            '--tw-prose-invert-code': theme('colors.warm.200'),
            '--tw-prose-invert-pre-code': theme('colors.warm.200'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.warm.700'),
            '--tw-prose-invert-td-borders': theme('colors.warm.800'),
          },
        },
      }),
    },
  },
  plugins: [typography],
}
