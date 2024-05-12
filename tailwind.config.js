/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{html,js,ts,tsx}'],
  theme: {
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '16px'],
      lg: ['20px', '16px'],
      xl: ['24px', '32px']
    },
    extend: {}
  },
  plugins: []
};
