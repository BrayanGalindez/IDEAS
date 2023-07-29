/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-theme': '#09595A',
        'color-theme-hover': '#F7C345',
        'color-terms' : '#0448F8',
        'color-button-hover' : '#F5B00A'
      },
    },
  },
  plugins: [],
}

