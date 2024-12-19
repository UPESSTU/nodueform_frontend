/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#033f64", // Dark blue from the UPES logo
        secondary: "#28666e", // Greenish-blue
        accent: "#7c9885", // Soft green
        neutral: "#b5b682", // Light olive
        background: "#ffffff", // White background
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
