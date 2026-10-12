/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        axelo: {
          white: '#FFFFFF',
          neutral: '#F7F7F5',
          surface: '#F1F1EE',
          dark: '#111111',
          charcoal: '#1A1A1A',
          muted: '#777777',
          subtle: '#999999',
          border: '#E8E8E8',
          borderDark: '#262626',
          blue: '#0052FF',
          blueHover: '#0043D6',
          blueLight: '#EEF3FF',
          deep: '#0B0F19',
          card: '#FAFAF8',
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
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace']
      },
      letterSpacing: {
        eyebrow: '0.14em',
        tighterHeading: '-0.035em',
        tightHeading: '-0.02em',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'product': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
