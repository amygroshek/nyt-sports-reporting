/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#a0522d',
        secondary: '#fff3e0',
        accent1: '#66bb6a',
        accent2: '#ffb74d',
        text: '#3e2723',
      },
    },
  },
  plugins: [],
};
