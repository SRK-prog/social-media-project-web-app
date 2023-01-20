module.exports = {
  purge: {
    content: [
      "./src/components/**/*.{js,jsx,ts,tsx}",
      "./src/common/**/*.{js,jsx,ts,tsx}",
      "./src/routes/**/*.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}",
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
        30: "#cec9c9",
        40: "#7e7d7d",
        50: "#f5f1f1",
        60: "#6d6b6b",
        70: "#efefef",
        80: "#575757",
        90: "#4b4747",
        100: "#c0bebe",
        110: "#f7f7f9",
        120: "#9c9c9c",
        130: "#f8f8f8",
        140: "#a9b9b9",
        150: "#dfdddd",
      },
      darkGray: {
        10: "#474646",
        20: "#777777",
        30: "#b6b6b6",
      },
      blue: {
        10: "#1877f2",
        20: "#2d82d1",
        30: "#3d89ee",
        40: "#1da1f3",
        50: "#3a8fde",
      },
      lightBlue: {
        10: "#d6e8fa",
        20: "#88b6f3",
      },
      red: {
        10: "#ff0000",
      },
    },

    extend: {
      spacing: {
        1.25: "5px",
        13.75: "55px",
        92.5: "370px",
      },
      fontSize: {
        "ft50-60": ["50px", { letterSpacing: "0em", lineHeight: "60px" }],
      },
      maxWidth: {
        112.5: "450px",
        360: "1440px",
      },
      maxHeight: {
        77.5: "310px",
        92.5: "370px",
        100: "400px",
      },
      minHeight: {
        62.5: "250px",
      },
    },
  },
  plugins: [],
};
