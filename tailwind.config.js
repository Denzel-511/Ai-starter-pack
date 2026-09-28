/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark navy / near-black base palette
        ink: {
          950: '#070B12',
          900: '#0A0F1A',
          850: '#0D1320',
          800: '#111827',
          750: '#161E2E',
          700: '#1B2436',
          600: '#222D43',
          500: '#2B3850',
          400: '#3A4863',
          300: '#5A6781',
          200: '#8895AE',
          100: '#B7C0D4',
          50: '#E5EAF2',
        },
        // Subtle blue accents
        accent: {
          50: '#EBF4FF',
          100: '#D6E6FF',
          200: '#A8C9FF',
          300: '#7AAEFF',
          400: '#4D8FFF',
          500: '#2B6FFF',
          600: '#1A57E6',
          700: '#1444B8',
          800: '#103893',
          900: '#0C2C72',
        },
        success: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        'glow-sm': '0 0 0 1px rgba(43,111,255,0.15), 0 4px 24px -8px rgba(43,111,255,0.35)',
        'glow': '0 0 0 1px rgba(43,111,255,0.25), 0 8px 40px -12px rgba(43,111,255,0.45)',
        'card': '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 1px 2px 0 rgba(0,0,0,0.4), 0 12px 32px -16px rgba(0,0,0,0.6)',
        'card-hover': '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 2px 4px 0 rgba(0,0,0,0.5), 0 20px 48px -20px rgba(43,111,255,0.25)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'radial-accent':
          'radial-gradient(60% 60% at 50% 0%, rgba(43,111,255,0.18) 0%, transparent 70%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-fast': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.6' },
          '70%': { transform: 'scale(1.1)', opacity: '0' },
          '100%': { transform: 'scale(1.1)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out both',
        'fade-in-fast': 'fade-in-fast 0.25s ease-out both',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16,1,0.3,1) both',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
};
