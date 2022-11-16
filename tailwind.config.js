/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./packages/**/*.{js,ts,jsx,tsx}",
    "./assets/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#E8ECE2",
      green: "#53E1AD",
      yellow: "#FBD200",
      red: "#ff665c",
      gray: "#242430",
      black: "#000",
      lowopacgray: " #858590",
    },
  },
  extend: {
    fontFamily: {
      sans: ["Nuform Sans"],
    },
    backgroundImage: {
      hero: "url('./public/Images/background.png')",
    },
  },
  plugins: [],
}
