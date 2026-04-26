/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        /* Primary pink scale */
        rose: {
          50:  '#fff0f6',
          100: '#fce4ec',
          200: '#f8bbd0',
          300: '#f48fb1',
          400: '#f06292',
          500: '#ec407a',
          600: '#e91e63',
          700: '#c2185b',
          800: '#880e4f',
          900: '#560027',
        },
        /* White-forward neutral */
        blush: {
          50:  '#ffffff',
          100: '#fdf8fb',
          200: '#fdf0f7',
          300: '#fce4ec',
          400: '#f4a0b5',
          500: '#d4647a',
        },
        charcoal: {
          900: '#1a0812',
          800: '#200d16',
          700: '#2e1520',
        },
      },
    },
  },
  plugins: [],
}
