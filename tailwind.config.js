/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "16px" },
    },
    fontFamily: {
      ptsansnarrow: ["ptsansnarrow"],
      ptsansnaBold: ["ptsansnaBold"],
      marcellus: ["marcellus"],
      manrope: ["manrope"],
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
      xs: "10px",
      s: "14px",
      m: "16px",
      sm: "18px",
      md: "20px",
      l: "24px",
    },
    extend: {
      colors: {
        black: "#000",
        warning: "#F89C3A",
        textcolor: "#C7C7C7",
        textakount: "#D7D7D7",
        white: "#FDFDFD",
        btn: "#101010",
        "btn-next": "#4F525D",
        grey: "#646464", //substrate
        stroke: "#bdbdbd",
        profile: "#893DD7",
        green: "#8BD73D",
        "green-hover": "#A3FF44",
        berus: "#44E9E8",
        "berus-hover": "#A3FFFE",
        purpl: "#8f8ded",
        purple: "#893DD7",
        "grey-text": "#c7c7c7",
        secondary: "#893dd7",
        "icons-bg": "#273b4a",
        placeholder: "#d7d7d7",
      },
    },
  },
  plugins: [],
};
