/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode support using a class
  theme: {
    extend: {
      colors: {
        // A more unique "brand" palette used throughout the app.
        // Keeping the existing class names (e.g. indigo-600) lets us swap in a fresh look without changing markup.
        indigo: {
          50: '#f2f7ff',
          100: '#dce8ff',
          200: '#b6d1ff',
          300: '#85adff',
          400: '#5c88ff',
          500: '#3a5fff',
          600: '#2f4ce6',
          700: '#2a3db8',
          800: '#233490',
          900: '#1c2b6f',
          950: '#121f4a',
        }
      }
    },
  },
  plugins: [],
}
