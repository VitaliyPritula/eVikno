/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      black: "#000",
      white: "#FDFDFD",
      btn: "#101010",
      text: "#C7C7C7",
      "btn-next": "#4F525D",
      grey: "#646464",
      gren: "#8BD73D",
      "gren-hover": "#A3FF44",
      berus: "#44E9E8",
      "berus-hover": "#A3FFFE",
      purpl: "#8f8ded",
      purple: "#893DD7",
    },
    fontWeight: {
      //font-medium
      light: "300",
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    fontSize: {
      //text-m
      xs: "12px",
      s: "14px",
      m: "16px",
      sm: "18px",
      md: "20px",
      l: "24px",
    },
    extend: {},
  },
  plugins: [],
};
