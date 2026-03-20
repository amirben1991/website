/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          '900': '#020208',
          '800': '#050510',
          '700': '#0a0a1a',
          '600': '#0d0d20',
          '500': '#12122e',
        },
        'neon': {
          'cyan':    '#00f5ff',
          'violet':  '#bf00ff',
          'green':   '#00ff88',
          'pink':    '#ff006e',
        },
        'text': {
          'primary':   '#e0e0ff',
          'secondary': '#b8b8e0',
          'muted':     '#6666aa',
        }
      },
      animation: {
        'fade-in-up':    'fadeInUp 0.5s ease-out forwards',
        'fade-in':       'fadeIn 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right':'slideInRight 0.5s ease-out forwards',
        'pulse-glow':    'pulse-glow 2s ease-in-out infinite',
        'neon-flicker':  'neon-flicker 3s infinite',
      },
      boxShadow: {
        'glow':       '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)',
        'glow-lg':    '0 0 30px rgba(0, 245, 255, 0.6), 0 0 60px rgba(0, 245, 255, 0.3)',
        'glow-violet':'0 0 15px rgba(191, 0, 255, 0.4), 0 0 30px rgba(191, 0, 255, 0.2)',
        'card':       '0 4px 6px rgba(0,0,0,0.5), 0 0 0 1px rgba(0, 245, 255, 0.08)',
        'card-hover': '0 12px 24px rgba(0,0,0,0.7), 0 0 0 1px rgba(0, 245, 255, 0.25), 0 0 20px rgba(0, 245, 255, 0.1)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

