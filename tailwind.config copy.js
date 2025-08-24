/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        quantumBlue: "#0ff0fc",
        quantumPurple: "#7a5fff",
        quantumGlass: "rgba(255, 255, 255, 0.08)"
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}
