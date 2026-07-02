import type { Config } from 'tailwindcss'

/** Aloshop admin design tokens — shares the storefront's emerald brand. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        ink: {
          DEFAULT: '#0f172a',
          soft: '#475569',
          muted: '#94a3b8',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f8fafc',
          sunken: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(15,23,42,0.06), 0 8px 24px -12px rgba(15,23,42,0.12)',
        soft: '0 1px 2px rgba(15,23,42,0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config
