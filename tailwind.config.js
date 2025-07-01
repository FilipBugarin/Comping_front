/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      primary: 'rgb(var(--primary-rgb) / <alpha-value>)',
      accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
      danger: 'rgb(var(--danger-rgb) / <alpha-value>)',
      warn: 'rgb(var(--warn-rgb) / <alpha-value>)',
      black: 'rgb(var(--black-rgb) / <alpha-value>)',
      white: 'rgb(var(--white-rgb) / <alpha-value>)',
    },
    extend: {
      borderColor: {
        DEFAULT: 'rgb(var(--black-rgb) / 0.1)',
      },
      animation: {
        slideInRight: 'slideInRight 200ms linear',
        slideOutRight: 'slideOutRight 200ms linear',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translate3d(100%, 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(100%, 0, 0)' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
