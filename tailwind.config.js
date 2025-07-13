/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        discordBg: '#2c2f33',
        discordCard: '#23272a',
        discordPurple: '#7289da',
      },
    },
  },
  plugins: [],
};
