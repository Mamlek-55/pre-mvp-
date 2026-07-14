/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAF7',
        gold: {
          50: '#FEF7E7',
          100: '#FDEEC8',
          200: '#F9D9A0',
          300: '#F4C06E',
          400: '#E5A43C',
          500: '#D4903A',
          600: '#B87830',
          700: '#9A5F28',
          800: '#7D4D22',
          DEFAULT: '#D4A23A',
        },
      },
    },
  },
  plugins: [],
};
