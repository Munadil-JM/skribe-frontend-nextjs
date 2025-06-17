/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#999999",
        customViolet: "#6C32A9",
        customGray50: "rgba(51, 51, 51, 0.5)",
        customGray64: "rgba(51, 51, 51, 0.64)",
        customVioletHeading: "#38185A",
        "checkbox-bg": "#EF724C",
        positive: "#85B502",
        neutral: "#BEBEBE",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, #F8F9FC 50%, white 50%)",
      },
      spacing: {
        13: "230px",
        "checkbox-padding": "1rem",
      },
      fontSize: {
        "11xl": ["5rem", { lineHeight: "1" }],
      },
      fontFamily: {
        poppins: ["poppins"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
