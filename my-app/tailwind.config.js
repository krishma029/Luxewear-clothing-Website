// tailwind.config.js

// Add this plugin function at the top of the file
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxe-pink-mist': '#F7DAE7',
        'luxe-bubblegum': '#E2B4C1',
        'luxe-cherry': '#D38C9D',
        'luxe-ruby': '#A55166',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
            '0%': { transform: 'translateX(-100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
            '0%': { transform: 'translateX(100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.8s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.8s ease-out forwards',
      },
    },
  },
  plugins: [
    // Add this plugin for animation delays
    plugin(function({ addUtilities }) {
      addUtilities({
        '.animation-delay-200': {
          'animation-delay': '0.2s',
        },
        '.animation-delay-400': {
          'animation-delay': '0.4s',
        },
        '.animation-delay-600': {
          'animation-delay': '0.6s',
        },
      })
    })
  ],
}