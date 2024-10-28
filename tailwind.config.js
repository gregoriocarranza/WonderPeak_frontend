/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#B15164",
          highlight: "#FE758F",
        },
        black: {
          DEFAULT: "#322F35",
          secondary: "#1D1B20",
        },
        secondary: {
          DEFAULT: "#49454F",
          secondary: "#625B71",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pregular: ["Poppins-Regular", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
