/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary : "#588159",
        secondary:{
          100:"#395a3f",
          200:"#a2b18a",
          300:"#592c0d",
        },
        background: "#e9d5ca",
        muted:"#4f4849"
      },
      fontFamily:{
        "Squada":["Squada_One","monospace"],
        "outfit":["Outfit","san-serif"],
        "outfit-black":["Outfit_Black","san-serif"],
        "outfit-bold":["Outfit_Bold","san-serif"],
        "outfit-extrabold":["Outfit_ExtraBold","san-serif"],
        "outfit-extralight":["Outfit_ExtraLight","san-serif"],
        "outfit-light":["Outfit_Light","san-serif"],
        "outfit-medium":["Outfit_Medium","san-serif"],
        "outfit-regular":["Outfit_Regular","san-serif"],
        "outfit-semibold":["Outfit_Semibold","san-serif"],
        "outfit-thin":["Outfit_Thin","san-serif"],
      }
    },
  },
  plugins: [],
};
