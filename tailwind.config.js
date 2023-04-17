/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'slide': 'slide 70s linear infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-1692px, 0, 0)' },
        }
      }
    },
  },
  plugins: [],
}