import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: ["light", "dark", "forest"],
  },
  theme: {
    extend: {
      scrollbar: {
        none: "scrollbar-width-none::-webkit-scrollbar { display: none; }",
      },
    },
  },
  plugins: [
    daisyui,
  ],
}

