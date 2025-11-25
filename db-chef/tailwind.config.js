/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },
        secondary: '#3b82f6',
        dark: {
          bg: '#0f172a',
          'bg-light': '#1e293b',
          'bg-lighter': '#334155',
        }
      }
    },
  },
  plugins: [],
}
