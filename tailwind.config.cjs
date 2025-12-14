/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'finops-blue': '#2563EB'
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
