import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024',
      xl: '1200px',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand: '#4C3E8C',
        secondBrand: '#5E4FA2',
        backgroundPage: '#362B67',
        hoverWhite: '#D7D5E1',
        brandDisabled: '#4A3D84',
        brandBorderDisabled: '#5A4E8E',
        arrowDisabled: '#9B95B3',
        leaderCard: '#C4C6F9'
      }
    },
  },
  plugins: [],
};
export default config;
