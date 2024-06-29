/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "cursive"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  darkMode: "class",
};
