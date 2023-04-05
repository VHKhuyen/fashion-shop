/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d9488",
        primary_hover: "#0f766e",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
