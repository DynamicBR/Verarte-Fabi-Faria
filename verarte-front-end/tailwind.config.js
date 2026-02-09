/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cafe: "#4a2c2a", // Marrom Café
        creme: "#fdfbf7", // Fundo Creme
        "rosa-antigo": "#e6c4c6", // Rosa Detalhes
        "verde-musgo": "#a7bba7", // Verde Detalhes
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
