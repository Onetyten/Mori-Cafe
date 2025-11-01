/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#BFFB4E",
        midnightBlue: "#0F0E17",
        Light: "#EEEEFB",
      },
    },
  },
  plugins: [],
};
