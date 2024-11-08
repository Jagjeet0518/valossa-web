/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",        
        "gradient-linear": "linear-gradient(var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "#BA60F6",
      accent: {
        blue: "#4F97DB",
        yellow: "#EAD814",
      },
      dark: "#121212",
      light: "#F1F1F1",
    }
  },
  plugins: [],
};
