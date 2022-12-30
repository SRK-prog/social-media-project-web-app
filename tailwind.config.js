module.exports = {
  purge: {
    content: [
      "./src/components/**/*.{js,jsx,ts,tsx}",
      "./src/common/**/*.{js,jsx,ts,tsx}",
      "./src/routes/**/*.{js,jsx,ts,tsx}",
    ],
    options: { safelist: [] },
  },
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: {
        0: "#000000",
      },
      gray: {
        10: "#e0dcdc",
        20: "#e7e7e7",
      },
    },

    extend: {
      fontSize: {
        "ft50-60": ["50px", { letterSpacing: "0em", lineHeight: "60px" }],
      },
    },
  },
  plugins: [],
};
