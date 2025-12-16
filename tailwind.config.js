/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //primary: '#22c55e',
        primary: '#81b14e',
        accent: '#F6E96B',
        background: '#fafafa',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}


