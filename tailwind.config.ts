import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
    extend: {
      screens: {
        max_sm: {'max': '480px'},
        max_md: {'max': '768px'},
        max_lg: {'max': '1024px'},
        max_xl: {'max': '1200px'},
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient": "linear-gradient(90deg, #EBE5F8 0%, #C4C6F9 33%, #C4C6F9 56%, #EBE5F8 100%)",
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
      },
      height: {
        '1/2-vh': '50vh',
        '1/3-vh': '66vh',
        '3/4-vh': '75vh',
      }
    },
  },
  plugins: [],
};
export default config;
