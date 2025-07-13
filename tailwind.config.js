export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

// vite.config.js
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
};
