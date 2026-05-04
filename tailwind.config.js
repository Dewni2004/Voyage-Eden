/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        'h1-mobile': '36px',
        'h1-desktop': '60px',
        'h2-mobile': '28px',
        'h2-desktop': '40px',
        'h3-mobile': '20px',
        'h3-desktop': '24px',
        'body': '16px',
      },
      colors: {
        primary: "#1e406f",
        luxury: "#c5a059", // Adding a luxury gold color accent
      }
    },
  },
  plugins: [],
}

