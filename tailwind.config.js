/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#04A7D3", // Dark blue from the UPES logo
        secondary: "#04B2D9", // Greenish-blue
        accent: "#F28F38", // Soft green
        neutral: "#F23078", // Light olive
        background: "#F2F2F2", // White background
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Clean, modern font
      },
      boxShadow: {
        custom: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      },
    },
  },
  plugins: [],
};
