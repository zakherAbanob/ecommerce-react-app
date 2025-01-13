/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#0aad0a",
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
