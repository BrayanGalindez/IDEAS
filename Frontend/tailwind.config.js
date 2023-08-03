/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-bg': '#09595A',
        'color-button': '#F5B00A',
        'color-button-hover' : '#D39E1E',
        'color-terms' : '#0448F8',
        
      },
    },
  },
  plugins: [],
}

