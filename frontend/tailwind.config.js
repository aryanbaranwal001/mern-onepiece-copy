import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: ["light", "dark", "forest"],
  },
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}

