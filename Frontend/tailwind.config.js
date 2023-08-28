/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'xxs': '360px',
        'xxxs': '210px',
        
      },
      colors: {
        "color-bg": "#09595A",
        "color-button": "#F7C345",
        "color-button-hover": "#F5B00A",
        "color-button-click": "#D39E1E",
        "color-terms": "#0448F8",
      },
    },
  },
  plugins: [],
};
