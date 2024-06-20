/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        sm: ['0.875rem', '1.25rem'],
        base: ['1rem', '1rem'],
        m: ['1.12500rem', '1rem'],
        lg: ['1.25rem', '1rem'],
        xl: ['1.5rem', '2rem']
      },
      fontFamily: {
        'cera-pro-medium': ['"Cera Pro Medium"', 'sans-serif'],
        'cera-pro-regular': ['"Cera Pro Regular"', 'sans-serif'],
        'cera-pro-bold': ['"Cera Pro Bold"', 'sans-serif']
      }
    }
  },
  plugins: []
};
