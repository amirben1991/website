/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs principales améliorées
        'dark': {
          '900': '#0f1218',
          '800': '#1a1f2e',
          '700': '#2d3748',
          '600': '#3f4b5d',
          '500': '#4a5568',
        },
        'accent': {
          '400': '#60a5fa',
          '500': '#3b82f6',
          '600': '#2563eb',
        },
        'text': {
          'primary': '#f8fafc',
          'secondary': '#e2e8f0',
          'muted': '#cbd5e1',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(96, 165, 250, 0.3)',
        'glow-lg': '0 0 30px rgba(96, 165, 250, 0.4)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(96, 165, 250, 0.1)',
        'card-hover': '0 12px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(96, 165, 250, 0.2)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

