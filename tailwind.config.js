/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        axelo: {
          white: '#FFFFFF',
          offwhite: '#FAFAFB',
          neutral: '#F4F5F7',
          surface: '#ECEEF2',
          silver: '#D5D9E0',
          border: '#E4E7EC',
          graphite: '#4B5563',
          muted: '#667085',
          subtle: '#98A2B3',
          charcoal: '#181B20',
          dark: '#0D1014',
          obsidian: '#07090D',
          blue: '#0066FF',
          blueHover: '#0052CC',
          blueSoft: '#EEF4FF',
          cyan: '#0EA5E9'
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      letterSpacing: {
        eyebrow: '0.16em',
        tighterHeading: '-0.035em',
        tightHeading: '-0.02em'
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(13, 16, 20, 0.04)',
        elevated: '0 20px 48px -18px rgba(13, 16, 20, 0.1)',
        product: '0 28px 60px -16px rgba(13, 16, 20, 0.12)'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};
