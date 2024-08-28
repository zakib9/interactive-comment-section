/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#5358b6",
        "secondary": "#f5f6fa",
        "delete": "#ec6664"
      },
    },
  },
  plugins: [],
}
