/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      tiny: "200px",
      sm: "300px",
      md: "460px",
      bigtablet: "570px",
      lg: "820px",
      xl: "1280px",
    },
  },

  plugins: [],
};
