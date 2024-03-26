import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: "#000000",
      white: "#ffffff",
      gray: {
        100: "#edf2f7",
        200: "#9f9f9f",
      },
      //gradient
      space: "#8adbd8",
      // primary: "#000000",
      // secondary: "#ff0000",
      // accent: "#fb0000",
      // neutral: "#1c1618",
      // info: "#38ACFF",
      // success: "#70D32A",s
      // warning: "#FFD000",
      // error: "#dc2626",
      buttonColorPrimary: "rgba(0, 189, 255, 0.19)",
      borderColor: "rgba(0, 0, 0, 0.1)",
    },

    extend: {
      fontFamily: {
        display: ["Be Vietnam Pro", "ital"],
      },
      boxShadow: {
        l: "6px 9px 47px 38px #edf2f7",
      },
    },
  },
  plugins: [],
};
export default config;
