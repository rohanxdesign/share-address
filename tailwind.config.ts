import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noontree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        primary: ['Noontree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Noon design system label sizes
        tiny: ['10px', { lineHeight: '12px', letterSpacing: '0px' }],
        'label-2': ['14px', { lineHeight: '18px', letterSpacing: '-0.26px' }],
        'label-3': ['13px', { lineHeight: '16px', letterSpacing: '-0.26px' }],
        // Primary (Noontree) label3 — slightly larger
        'label-3p': ['14px', { lineHeight: '18px', letterSpacing: '-0.14px' }],
        'label-4': ['14px', { lineHeight: '20px', letterSpacing: '-0.12px' }],
        'label-4p': ['12px', { lineHeight: '14px', letterSpacing: '-0.12px' }],
        'label-5': ['11px', { lineHeight: '12px', letterSpacing: '-0.12px' }],
      },
      colors: {
        neutral: { white: '#FFFFFF', black: '#000000' },
        'noon-yellow': '#FEEE00',
        'noon-red': '#F4364C',
        'blue-gray': {
          100: '#F9F9FB',
          200: '#F2F3F7',
          300: '#EAECF0',
          400: '#D4D6DD',
          500: '#A6ABB8',
          600: '#666D85',
          700: '#475067',
          800: '#2E3553',
          900: '#1D2539',
          1000: '#101628',
        },
        blue: {
          50: '#EFF7FF',
          100: '#E1EFFF',
          400: '#3D7CFF',
          500: '#0076FF',
          600: '#0076FF',
          700: '#0057FF',
          pin: '#035794',
        },
        red: {
          50: '#FEEBEB',
          100: '#FCD2D2',
          600: '#F43333',
          700: '#DE1C1C',
        },
        green: {
          50: '#F2FBF5',
          100: '#E5F6E6',
          600: '#108757',
          700: '#0E875E',
        },
        // Semantic text
        ink: {
          DEFAULT: 'rgba(2,6,12,0.92)',
          secondary: 'rgba(2,6,12,0.6)',
          tertiary: 'rgba(2,6,12,0.4)',
          inverse: '#FFFFFF',
        },
      },
      borderRadius: {
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
      },
      boxShadow: {
        // Drop Shadow / XS — Figma token
        xs: '0 1px 3px rgba(34,34,34,0.06)',
        // Inset for selected pill within toggle
        'inset-toggle': 'inset 0 0 4px 0 rgba(14,14,14,0.06)',
        sheet: '0 -8px 24px rgba(0,0,0,0.08)',
      },
      letterSpacing: {
        'label-2': '-0.26px',
        'label-5': '-0.12px',
      },
    },
  },
  plugins: [],
} satisfies Config
