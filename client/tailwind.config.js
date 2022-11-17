// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],

//   theme: {
//     extend: {
//       colors: {
//         amazon_blue: {
//           light: "#232F3E",
//           DEFAULT: "#131921",
//           icon: "#cd9042",
//         },
//       },
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [require("@tailwindcss/line-clamp")],
// };
module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
          btn: "#f0c14b",
          btnHover: "#EFBA35",
        },
        amazonBg: {
          bgColor: "#f0f2f4",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
