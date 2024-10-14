import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#323232",    
        secondary: "#212121",  
        tertiary: "#5E61AA",  
        text: "#D1D5DB"      
      },
    },
  },
  plugins: [],
};

export default config;
