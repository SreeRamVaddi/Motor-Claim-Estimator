import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-void': '#000000',
        'bg-deep': '#0A0A0F',
        'bg-surface': '#111118',
        'bg-elevated': '#1A1A24',
        'bg-light': '#F5F5F7',
        'bg-white': '#FFFFFF',
        // Accents
        'accent-primary': '#FF3B30',
        'accent-electric': '#0071E3',
        'accent-gold': '#FFD60A',
        'accent-green': '#30D158',
        // Text
        'text-primary': '#F5F5F7',
        'text-secondary': '#A1A1A6',
        'text-tertiary': '#6E6E73',
        'text-dark': '#1D1D1F',
        'text-dark-2': '#6E6E73',
      },
      fontFamily: {
        'clash': ['var(--font-clash)', 'Clash Display', 'sans-serif'],
        'instrument': ['var(--font-instrument)', 'Instrument Serif', 'Georgia', 'serif'],
        'mono': ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        'sans': ['var(--font-instrument)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2.5s linear forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,113,227,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(0,113,227,0.7)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
